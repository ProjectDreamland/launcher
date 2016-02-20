import React from 'react'

import Launcher from './Launcher.react'
import gameCheck from '../utils/gameCheck'
import updaterUtil from '../utils/updaterUtil'


export default class Framework extends React.Component {
	state = {
		canPlay: false
	};

	componentWillMount() {
		updaterUtil.check(false)
	}

	componentDidMount() {
		const checker = new gameCheck()
		checker.on('done', () => this.setState({
			canPlay: true
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