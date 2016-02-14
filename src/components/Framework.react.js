import React from 'react'
import {
	Snackbar
}
from 'material-ui'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Theme from '../theme'

import Sidebar from './Sidebar.react'
import Settings from './Settings.react'

import AppStore from '../stores/appStore'
import AppActions from '../actions/appActions'


export default class Framework extends React.Component {
	state = AppStore.getState();

	static childContextTypes = {
		muiTheme: React.PropTypes.object
	};

	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(Theme)
		}
	}

	componentWillMount() {
		injectTapEventPlugin()
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
            	<Sidebar />
            	<Settings />
            	<Snackbar 
            		onRequestClose={() => AppActions.info(false)}
            		{...this.state.info} />
            </div>
		)
	}
}