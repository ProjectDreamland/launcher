import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import request from 'request';
import progress from 'request-progress';
import child_process from 'child_process';
import _ from 'lodash';
import url from 'url';
import updaterActions from '../actions/updateActions';
import {
    app
}
from 'remote';

console.log("Updater");

var tryedAgain = false;

const appUpdateDir = path.join(app.getPath('xxx'), 'xxx');

if (!fs.existsSync(appUpdateDir))
    fs.mkdirSync(appUpdateDir);

const download = (url, filename, size, version) => {
    var outPath = path.join(appUpdateDir, filename);

    fs.readdirSync(appUpdateDir).filter(file => {
        if (file !== filename)
            fs.unlink(path.join(appUpdateDir, file))
    });

    try {
        if (fs.statSync(outPath).size === size) {
            updaterActions.updateAvailable(outPath);
            return;
        }
    } catch (e) {

    }

    progress(request(url), {
        throttle: 2000,
        delay: 1000
    })
        .on('progress', state => {
            console.log('Update download percent:', state.percent + '%', '\nETA:', state.eta.toString(), 'seconds');
        })
        .on('error', err => {
            console.error('Error downloading update!', err);
        })
        .pipe(fs.createWriteStream(outPath))
        .on('finish', () => {
            console.info('Update successfully downloaded to', outPath);

            updaterActions.updateAvailable(outPath);
        });
}

const installUpdate = updatePath => {
    switch (process.platform) {
        case 'win32':
            exec(updatePath, ['--update'], {
                detached: true
            });
            break;
    }
}

const getJson = url => {
    return new Promise((resolve, reject) => {
        request(url, {
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode == 200)
                resolve(body)
            else
                reject('something went Very Wong:' + error + '\nCODE:' + response.statusCode + '\nBODY:' + JSON.stringify(body));
        });
    })
}

const exec = (execPath, args = [], options = {}) => {
    child_process.exec(execPath + ' ' + args.join(' '), options, (error, stdout, stderr) => {
        if (error) {
            console.error(stderr);
        }
        console.log(stdout);
    });
}

module.exports = {
    check() {
        if (process.env.NODE_ENV === 'development')
            return console.info('Development mode active, not checking for updates');
        else
            console.info('Checking for updates for client');

        getJson('updatejson')
            .then(json => {
                //check shit, download shit, install shit
            })
            .catch(err => {
                console.log(err);
                if (!tryedAgain) {
                    tryedAgain = true;
                    _.delay(this.check.bind(this, true), 1000)
                }
            })
    },
    install: installUpdate
}