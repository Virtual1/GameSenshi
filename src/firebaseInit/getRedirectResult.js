import {
	storeModalProcessLinking,
	storeMNodalClear,
	storeModalSimpleError,
} from 'state'
import {
	handleDifferentCredential,
	linkedThen,
} from 'firebaseInit/handleDifferentCredential'
import { auth } from 'firebaseInit/core'
import {
	UNEXPECTED_ERROR_CODE_6,
	UNEXPECTED_ERROR_CODE_8,
	UNEXPECTED_ERROR_CODE_9,
	UNEXPECTED_ERROR_CODE_10,
	FUNCTION_OAUTH_CODE,
	FUNCTION_REDIRECT_URI,
	ENV_TWITCH_REDIRECT,
	FUNCTION_CUSTOM_TOKEN,
} from 'constantValues'
import { functSignInTwicth } from 'firebaseInit/cloudFunct'

const REDIRECT_URL = 'redirect_url'

const storeRedirectUrl = () =>
	sessionStorage.setItem(REDIRECT_URL, window.location.href)

const getRedirectResult = async () => {
	let result = null
	try {
		result = await auth().getRedirectResult() // redirect run when website start
	} catch (err) {
		storeMNodalClear()
		console.log(err)
		const { code, credential, email } = err
		if (code === 'auth/account-exists-with-different-credential') {
			handleDifferentCredential(auth, email, credential)
		} else {
			storeModalSimpleError(err, UNEXPECTED_ERROR_CODE_6)
		}
		return
	}

	const { user } = result
	// need this condition because this part run when webpage start
	if (user) {
		// ! google unlink facebook: https://github.com/firebase/firebase-js-sdk/issues/569
		const linkWithRedirect = provider2 => {
			user.linkWithRedirect(new auth[provider2]()).catch(err => {
				storeModalSimpleError(err, UNEXPECTED_ERROR_CODE_8)
			})
		}
		storeModalProcessLinking(linkWithRedirect, linkedThen)
	} else {
		const redirectUrl = sessionStorage.getItem(REDIRECT_URL)
		if (redirectUrl) {
			sessionStorage.removeItem(REDIRECT_URL)
			const searchParams = new URLSearchParams(redirectUrl)
			let oauthCode = null
			for (let p of searchParams) {
				if (p[0].includes('code')) {
					oauthCode = p[1]
				}
			}
			if (oauthCode) {
				let customTokenData = null
				try {
					customTokenData = await functSignInTwicth({
						[FUNCTION_OAUTH_CODE]: oauthCode,
						[FUNCTION_REDIRECT_URI]: ENV_TWITCH_REDIRECT,
					})
				} catch (err) {
					console.log(err)
					storeModalSimpleError(err, UNEXPECTED_ERROR_CODE_9)
				}

				if (customTokenData) {
					auth()
						.signInWithCustomToken(customTokenData.data[FUNCTION_CUSTOM_TOKEN])
						.then(() => {
							storeMNodalClear()
						})
						.catch(err => {
							console.log(err)
							storeModalSimpleError(err, UNEXPECTED_ERROR_CODE_10)
						})
				}
			} else {
				storeMNodalClear()
			}
		} else {
			storeMNodalClear()
		}
	}
}

export { getRedirectResult, storeRedirectUrl }
