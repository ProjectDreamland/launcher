import fs from 'fs'
import path from 'path'
import md5File from 'md5-file'
import request from 'request'
import _ from 'lodash'
import async from 'async'
import {
	EventEmitter
}
from 'events'


export default class Checker extends EventEmitter {
	constructor() {
		super()

		this.gameDir = path.join(__dirname, '../../', 'game')

		this.queue = async.queue((file, next) => this.checkFileSync(file)
			.then(next)
			.catch(err => {
				console.error(err)
				next()
			}))

		this.queue.drain = () => this.emit('done')

		this.checkRemote()
			.then(hashes => {
				if (hashes.length === 0)
					return this.emit('done')

				_.forEach(hashes, (hash, filePath) => this.queue.push({
					filePath, hash
				}))
			})
			.catch(console.error)
	}

	checkRemote() {
		return new Promise((resolve, reject) => request('http://codeusa.net/apps/poptartt/updates/update.json', {
			json: true
		}, (error, response, body) => {
			if (!error && response.statusCode == 200)
				resolve(body.hashes)
			else
				reject('something went Very Wong:' + error + '\nCODE:' + response.statusCode + '\nBODY:' + JSON.stringify(body));
		}))
	}

	checkFileSync({
		filePath, hash
	}) {
		return new Promise((resolve, reject) => {
			return this.verifyFile(path.join(this.gameDir, filePath), hash)
				.then(verified => {
					if (verified) {
						console.info('Verified:', path.join(this.gameDir, filePath))
						return resolve()
					}
					return this.downloadUpdatedFile(filePath, hash)
						.then(resolve)
						.catch(reject)
				})
		})
	}

	verifyFile(filepath, hash) {
		return new Promise(resolve => {

			if (!fs.existsSync(path.dirname(filepath)))
				fs.mkdirSync(path.dirname(filepath))

			md5File(filepath, (error, fileHash) => {
				if (error) return resolve(false)
				return resolve(hash === fileHash.toUpperCase())
			})
		})
	}

	downloadUpdatedFile(filePath, hash) {
		return new Promise((resolve, reject) => {
			request(`http://codeusa.net/apps/poptartt/updates/${filePath}`)
				.on('error', err => {
					console.error(`Error downloading ${filePath}`, err)
					reject(err)
				})
				.pipe(fs.createWriteStream(path.join(this.gameDir, filePath)))
				.on('finish', () => this.verifyFile(path.join(this.gameDir, filePath), hash)
					.then(verified => {
						if (!verified) return reject()
						console.info('Update successfully downloaded to:', path.join(this.gameDir, filePath))
						resolve()
					})
					.catch(reject))
		})
	}
}