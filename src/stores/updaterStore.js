import alt from '../alt'
import AppActions from '../actions/appActions'
import UpdaterActions from '../actions/updaterActions'

class UpdaterStore {
	constructor() {
		this.bindActions(UpdaterActions)
		this.update = false;
	}
	onUpdateAvailable(update) {
        this.setState({
            update: update
        });
    }
}

export default alt.createStore(UpdaterActions)