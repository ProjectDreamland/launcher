import ls from 'local-storage'
import {
	v4 as uuid
}
from 'uuid'
import alt from '../alt'
import AppActions from '../actions/appActions'

const setAnalyticsID = (id = uuid()) => {
	ls.set('analyticsID', id)
	return id
}

class AppStore {
	constructor() {
		this.bindActions(AppActions)

		/* Core Settings */

		this.analiticsID = ls.get('analyticsID') || setAnalyticsID()

		this.info = {
			open: false,
			message: ''
		}
	}


	/* Core */

	onInfo(info) {
		if (!info)
			return this.info = {
				open: false,
				message: ''
			}
		this.info = info
	}

}

export default alt.createStore(AppStore)