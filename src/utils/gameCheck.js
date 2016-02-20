import fs from 'fs'
import path from 'path'
import xxhashjs from 'xxhashjs'
import request from 'request'
import _ from 'lodash'
import Promise from 'bluebird'
import async from 'async'
import {
	EventEmitter
}
from 'events'


export default class Checker extends EventEmitter {
	constructor() {
		super()

		this.gameDir = path.join(__dirname, '../../', 'game')

		this.queue = async.queue((file, next) => this.checkFileSync(file).then(next).catch(err => {
			console.error(err)
			next()
		}))

		this.init()
	}


	get percentDone() {



	}


	init() {
		this.checkRemote()
			.then(hashes => _.forEach(hashes, (hash, filePath) => this.queue.push({
				filePath, hash
			})))
			.catch(error => {
				console.error(error)
			})
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

	updateProgress() {
		this.emit('progress', percent)
	}

	checkFileSync({
		filePath, hash
	}) {
		return new Promise((resolve, reject) => {
			const relativeFilePath = path.join(this.gameDir, filePath)
			let filePresent = false
			try {
				filePresent = fs.statSync(relativeFilePath)
			} catch (e) {
				console.error(e)
			}
			console.log(filePresent)
			if (!filePresent)
				return this.downloadUpdatedFile(filePath, hash)

		})
	}

	verifyFile(filepath, hash) {
		return new Promise((resolve, reject) => {
			const buf = fs.readFileSync(filepath)
			console.log('data loaded:', buf.length, 'bytes')
			var startTime = Date.now()
			var h = xxhashjs(0).update(buf).digest()
			var delta = Date.now() - startTime
			console.log('0x' + h.toString(), 'in', delta, 'ms')
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
				.on('finish', () => {
					console.info('Update successfully downloaded to', path.join(this.gameDir, filePath))
					this.verifyFile(path.join(this.gameDir, filePath), hash)
						.then(resolve)
						.catch(reject)
				})
		})
	}
}