import {
	storeModalProcessLinking,
	storeModalClear,
	storeModalSimpleError,
	storeModalRemoveItem,
	storeModalGetRedirectUrl,
} from '2_state'

import { handleDifferentCredential, linkedThen, auth } from '1_fire_init'

import { functSignInTwicth } from '2_fire_funct'

import {
	UNEXPECTED_ERROR_CODE_6,
	UNEXPECTED_ERROR_CODE_8,
	UNEXPECTED_ERROR_CODE_9,
	UNEXPECTED_ERROR_CODE_10,
	UNEXPECTED_ERROR_CODE_12,
	FUNCTION_TOKEN_CUSTOM,
} from '0_constants'

// ! google unlink facebook: https://github.com/firebase/firebase-js-sdk/issues/569
const linkWithRedirect = (provider2, credential) => {
	if (provider2 === 'password') {
		return auth()
			.currentUser.linkWithCredential(auth.AuthCredential.fromJSON(credential))
			.then(() => {
				linkedThen()
			})
			.catch(err => {
				storeModalSimpleError(err, UNEXPECTED_ERROR_CODE_12)
			})
	} else {
		return auth()
			.currentUser.linkWithRedirect(new auth[provider2]())
			.catch(err => {
				storeModalSimpleError(err, UNEXPECTED_ERROR_CODE_8)
			})
	}
}

const getRedirectResult = async () => {
	let result = null
	try {
		result = await auth().getRedirectResult() // redirect run when website start
	} catch (err) {
		const { code, credential, email } = err
		if (
			code &&
			code.includes('auth/account-exists-with-different-credential')
		) {
			handleDifferentCredential(email, credential)
		} else {
			storeModalRemoveItem()
			storeModalSimpleError(err, UNEXPECTED_ERROR_CODE_6)
		}
		return
	}

	const { user } = result
	if (user) {
		storeModalProcessLinking(linkWithRedirect, linkedThen)
	} else {
		const redirectUrl = storeModalGetRedirectUrl()
		if (redirectUrl) {
			const searchParams = new URLSearchParams(redirectUrl)
			let oAuthCode = null
			for (let p of searchParams) {
				if (p[0].includes('code')) {
					oAuthCode = p[1]
				}
			}
			if (oAuthCode) {
				let customTokenData = null
				try {
					customTokenData = await functSignInTwicth(oAuthCode)
				} catch (err) {
					console.log(err)
					storeModalSimpleError(err, UNEXPECTED_ERROR_CODE_9)
				}

				if (customTokenData) {
					try {
						await auth().signInWithCustomToken(
							customTokenData.data[FUNCTION_TOKEN_CUSTOM]
						)
					} catch (err) {
						return storeModalSimpleError(err, UNEXPECTED_ERROR_CODE_10)
					}
					storeModalProcessLinking(linkWithRedirect, linkedThen)
				}
			} else {
				storeModalClear()
			}
		} else {
			storeModalClear()
		}
	}
}

export { getRedirectResult }
