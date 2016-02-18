import ls from 'local-storage'
import alt from '../alt'
import AppActions from '../actions/appActions'

class AppStore {
	constructor() {
		this.bindActions(AppActions)
	}
}

export default alt.createStore(AppStore)