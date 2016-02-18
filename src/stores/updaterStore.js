import alt from '../alt'
import AppActions from '../actions/appActions'
import UpdaterActions from '../actions/updaterActions'

class UpdaterStore {
	constructor() {
		this.bindActions(UpdaterActions)
	}
}

export default alt.createStore(UpdaterActions)