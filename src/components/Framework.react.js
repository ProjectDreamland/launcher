import React from 'react'
import Launcher from './Launcher.react'

import AppStore from '../stores/appStore'
import AppActions from '../actions/appActions'

export default class Framework extends React.Component {
	state = AppStore.getState();

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