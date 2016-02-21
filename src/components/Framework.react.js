import React from 'react'

import Launcher from './Launcher.react'
import gameCheck from '../utils/gameCheck'
import updaterUtil from '../utils/updaterUtil'


export default class Framework extends React.Component {
	state = {
		canPlay: false,
		updating: false
	};

	componentWillMount() {
		updaterUtil.check(false)
	}

	componentDidMount() {
		const checker = new gameCheck()
		checker.on('updating', () => this.setState({
			updating: true
		}))
		checker.on('done', () => this.setState({
			canPlay: true,
			updating: false
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