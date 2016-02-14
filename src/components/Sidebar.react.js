import React from 'react'
import AppStore from '../stores/appStore'


export default class Sidebar extends React.Component {
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
			<div className='sidebar'>
            	<img className={`logo ${this.state.updating ? 'fade' : void 0}`} src={`images/logo-sidebar.png`}/>
            </div>
		)
	}
}