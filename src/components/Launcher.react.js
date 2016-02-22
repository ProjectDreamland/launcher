import React from 'react'
import path from 'path'
import shell from 'shell'
import Progress from './Progress'
import {
	spawn
}
from 'child_process'
import {
	getCurrentWindow
}
from 'remote'

var updated = 0;

export default class LUNCH extends React.Component {

	handelClick() {
		if (!this.props.canPlay) return

		const gameSpawn = spawn(path.join(__dirname, '../../', 'game', 'A51.exe'), {
			detached: true,
			cwd: path.join(__dirname, '../../', 'game')
		})

		gameSpawn.stdout.on('data', console.log)
		gameSpawn.stderr.on('data', console.log)
		gameSpawn.on('exit', (code) => console.log(`Child exited with code ${code}`))
	}

	openSource() {
		shell.openExternal('https://github.com/luigiplr/area51-launcher')
		shell.openExternal('https://github.com/Codeusa/Area51')
	}

	getLaunchStatus () {
		if (this.props.updating)
			return 'Updating...'
		else if (this.props.canPlay)
			return 'Launch Game'
		else
			return 'Verifying Files...'
	}

	render() {
		const launchButton = this.getLaunchStatus()
		return (
			<div className="container">
				<div className="background-container">
					<video autoPlay loop width="100%" height="100%">
						<source src="images/background.webm" />
					</video>
				</div>
				<div className="content">
					<div className="logo">
						<img src="images/logo.png" />
					</div>
					<div className="progress-container">
						{this.props.progress ? <Progress {...this.props} /> : ''}
					</div>
					<div className="buttons">
	        			<div className={`btn launch ${this.props.canPlay ? '' : 'verify'}`} onClick={() => this.handelClick()}>{launchButton}</div>
	        			<div className="btn quit" onClick={() => getCurrentWindow().close()}>Quit</div>
	        		</div>
	        		<div className="social">
		        		<div className="github" onClick={this.openSource}>
		        			<img src="images/GitHub-Mark-Light-120px-plus.png" />
		        		</div>
		        		<div className="twitter">
		        			<span onClick={() => shell.openExternal('https://twitter.com/luigiplr')}>@luigiplr</span>
		        			<span onClick={() => shell.openExternal('https://twitter.com/Andrewmd5')}>@Andrewmd5</span>
		        		</div>
		        	</div>
				</div>
            </div>
		)
	}
}