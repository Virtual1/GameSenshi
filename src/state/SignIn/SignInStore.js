import { Container } from 'unstated'
import { STATE, SET_STATE, RESET_STATE } from 'constantValues'

const SIGN_IN_STORE_STATE_OPEN = 'open'
const SIGN_IN_STORE_STATE_EMAIL = 'email'
const SIGN_IN_STORE_STATE_CALLBACK = 'callback'

const SIGN_IN_STORE_SHOW = 'show'
const SIGN_IN_STORE_CLOSE = 'close'
const SIGN_IN_STORE_TOGGLE = 'toggle'

const defaultValues = {
	[SIGN_IN_STORE_STATE_EMAIL]: '',
	[SIGN_IN_STORE_STATE_OPEN]: false,
	[SIGN_IN_STORE_STATE_CALLBACK]: () => {},
}

class SignInStore extends Container {
	constructor() {
		super()
		this[STATE] = defaultValues
		this[SET_STATE] = this[SET_STATE].bind(this)
	}

	[RESET_STATE] = () => {
		this.setState(defaultValues)
		return this
	};

	[SIGN_IN_STORE_SHOW] = (email, afterSubmitCallback = () => {}) => {
		this.setState({
			[SIGN_IN_STORE_STATE_EMAIL]: email,
			[SIGN_IN_STORE_STATE_OPEN]: true,
			[SIGN_IN_STORE_STATE_CALLBACK]: afterSubmitCallback,
		})
		return this
	};

	[SIGN_IN_STORE_CLOSE] = () => {
		this.setState({ [SIGN_IN_STORE_STATE_OPEN]: false })
		return this
	};

	[SIGN_IN_STORE_TOGGLE] = () => {
		this.setState(state => {
			state[SIGN_IN_STORE_STATE_OPEN] = !state[SIGN_IN_STORE_STATE_OPEN]
			return state
		})
		return this
	}
}

export {
	SignInStore,
	SIGN_IN_STORE_STATE_OPEN,
	SIGN_IN_STORE_STATE_EMAIL,
	SIGN_IN_STORE_STATE_CALLBACK,
	SIGN_IN_STORE_SHOW,
	SIGN_IN_STORE_CLOSE,
	SIGN_IN_STORE_TOGGLE,
	SET_STATE,
	RESET_STATE,
}