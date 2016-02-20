import React from 'react'
import path from 'path'
import {
	spawn
}
from 'child_process'
import {
	getCurrentWindow
}
from 'remote'


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

	render() {
		const launchButton = this.props.canPlay ? 'Launch' : 'Verifying Local Files...'
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
					<div className="buttons">
	        			<div className="btn launch" onClick={() => this.handelClick()}>{launchButton}</div>
	        			<div className="btn quit" onClick={() => getCurrentWindow().close()}>Quit</div>
	        		</div>
				</div>
            </div>
		)
	}
}