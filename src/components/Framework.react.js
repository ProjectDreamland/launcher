import React from 'react'

import Launcher from './Launcher.react'
import gameCheck from '../utils/gameCheck'
import updaterUtil from '../utils/updaterUtil'


export default class Framework extends React.Component {
	state = {
		canPlay: false,
		updating: false,
		progress: null
	};

	componentWillMount() {
		updaterUtil.check(false)
	}

	componentDidMount() {
		const checker = new gameCheck()
		checker.on('progress', prog => this.setState({
			progress: prog
		}))
		checker.on('updating', () => this.setState({
			updating: true
		}))
		checker.on('done', () => this.setState({
			canPlay: true,
			updating: false,
			progress: "finished"
		}))
	}

	render() {
		return (
			<div>
            	<Launcher {...this.state} />
            </div>
		)
	}
}