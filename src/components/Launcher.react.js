import React from 'react'
import {
	getCurrentWindow
}
from 'remote'

import AppStore from '../stores/appStore'
import AppActions from '../actions/appActions'


class If extends React.Component {
	render() {
		return this.props.test ? this.props.children : null
	}
}

export default class Settings extends React.Component {

	state = AppStore.getState();

	componentDidMount() {
		AppStore.listen(this.onChange)
	}

	componentWillUnmount() {
		AppStore.unlisten(this.onChange)
	}

	onChange = () => this.setState(AppStore.getState());

	handelClick() {
		console.log("Click");
	}

	render() {
		let launchButton = "Launch";
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
	        			<div className="btn launch" onClick={this.handelClick}>{launchButton}</div>
	        			<div className="btn quit" onClick={() => getCurrentWindow().close()}>Quit</div>
	        		</div>
				</div>
            </div>
		)
	}
}