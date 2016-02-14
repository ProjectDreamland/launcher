import React from 'react'
import {
	MenuItem, RaisedButton, Toggle
}
from 'material-ui'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Theme from '../theme'

import AppStore from '../stores/appStore'
import AppActions from '../actions/appActions'


class If extends React.Component {
	render() {
		return this.props.test ? this.props.children : null
	}
}

export default class Settings extends React.Component {

	state = AppStore.getState();

	static childContextTypes = {
		muiTheme: React.PropTypes.object
	};

	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(Theme)
		}
	}

	componentDidMount() {
		AppStore.listen(this.onChange)
	}

	componentWillUnmount() {
		AppStore.unlisten(this.onChange)
	}

	onChange = () => this.setState(AppStore.getState());

	getStyle(el) {
		switch (el) {
			case 'feild':
				return {
					floatingLabelStyle: {
						fontWeight: 500
					},
					style: {
						fontWeight: 300
					}
				}
				break
			case 'toggle':
				return {
					fontWeight: 300,
					marginTop: 16
				}
				break
			default:
				return {}
		}
	}

	render() {
		const feildStyles = this.getStyle('feild')
		const toggleSTyle = this.getStyle('toggle')

		return (
			<div className='content'>
        		
			    <Toggle
      				label='Auto Update'
      				defaultToggled={this.state.autoSync}
      				style={toggleSTyle}
      				onToggle={(event, autoSync) => AppActions.autoSyncChange(autoSync)}
    				/>

        		<div className='bottom'>
        			<RaisedButton style={{ margin: 12, float: 'right', marginLeft: 15}} label='Launch' />
        			<RaisedButton label='Quit' style={{ margin: 12, float: 'right', marginRight: 0}} />
        		</div>
            </div>
		)
	}
}