import {
	Alert,
	ALERT_STATE_BODY,
	ALERT_STATE_STATUS,
	ALERT_STATE_IS_OPEN,
	ALERT_TOGGLE,
} from './Alert'

import {
	StateContainer,
	storeAlert,
	STORE_ALERT_STATE_BODY,
	STORE_ALERT_STATE_STATUS,
	STORE_ALERT_STATE_IS_OPEN,
	storeAlertToggle,
} from '2_state'

const mapStoreAlertStateToProp = {
	[ALERT_STATE_BODY]: STORE_ALERT_STATE_BODY,
	[ALERT_STATE_STATUS]: STORE_ALERT_STATE_STATUS,
	[ALERT_STATE_IS_OPEN]: STORE_ALERT_STATE_IS_OPEN,
}

const mapStoreAlertMethodToProp = {
	[ALERT_TOGGLE]: storeAlertToggle,
}

const AlertStoreAlert = StateContainer(
	Alert,
	[storeAlert],
	[mapStoreAlertStateToProp],
	[mapStoreAlertMethodToProp]
)

export { Alert, AlertStoreAlert }
