import ls from 'local-storage'
import alt from '../alt'
import AppActions from '../actions/appActions'

class AppStore {
	constructor() {
		this.bindActions(AppActions)
		this.updating = false;
		this.progress = 0;
		this.eta = undefined;
	}
	onSetProgress(progress, eta) {
        this.setState({
            progress: eta,
            eta: eta
        });
    }
}

export default alt.createStore(AppStore)