import React from 'react'

import Launcher from './Launcher.react'
import gameCheck from '../utils/gameCheck'


export default class Framework extends React.Component {
	state = {
		canPlay: false
	};

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