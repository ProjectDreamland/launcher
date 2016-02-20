import React from 'react'
import Launcher from './Launcher.react'

import AppStore from '../stores/appStore'
import AppActions from '../actions/appActions'
import gameCheck from '../utils/gameCheck'


export default class Framework extends React.Component {
	state = AppStore.getState();

	componentWillMount() {
		const checker = new gameCheck()
	}

	componentDidMount() {
		AppStore.listen(this.onChange)
	}

	componentWillUnmount() {
		AppStore.unlisten(this.onChange)
	}

	onChange = () => this.setState(AppStore.getState());

	render() {
		return (
			<div>
            	<Launcher />
            </div>
		)
	}
}