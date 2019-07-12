import * as firebase from 'firebase/app' // https://stackoverflow.com/questions/48592656/firebase-auth-is-not-a-function/56280110#56280110
import 'firebase/auth'
import * as functions from 'firebase-functions' // https://stackoverflow.com/questions/51118943/cannot-read-property-https-of-undefined-error-in-firebase-functions
import * as admin from 'firebase-admin'

import {
	ENV,
	ENV_REACT_APP_API_KEY,
	ENV_REACT_APP_AUTH_DOMAIN,
	ENV_REACT_APP_DATABASE_URL,
	ENV_REACT_APP_PROJECT_ID,
	ENV_REACT_APP_STORAGE_BUCKET,
	ENV_REACT_APP_MESSAGING_SENDER_ID,
	ENV_REACT_APP_APP_ID,
} from 'constantValues'

const env = functions.config()[ENV]

const firebaseConfig = {
	apiKey: env[ENV_REACT_APP_API_KEY],
	authDomain: env[ENV_REACT_APP_AUTH_DOMAIN],
	databaseURL: env[ENV_REACT_APP_DATABASE_URL],
	projectId: env[ENV_REACT_APP_PROJECT_ID],
	storageBucket: env[ENV_REACT_APP_STORAGE_BUCKET],
	messagingSenderId: env[ENV_REACT_APP_MESSAGING_SENDER_ID],
	appId: env[ENV_REACT_APP_APP_ID],
}

firebase.initializeApp(firebaseConfig)

admin.initializeApp()

const auth = firebase.auth

export { auth, functions, env }
