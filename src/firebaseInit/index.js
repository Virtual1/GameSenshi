// firebase
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'

import { onAuthChanged } from 'firebaseInit/onAuthChanged'
import { getRedirectResult } from 'firebaseInit/getRedirectResult'

const env = process.env

const firebaseConfig = {
	apiKey: env.REACT_APP_API_KEY,
	authDomain: env.REACT_APP_AUTH_DOMAIN,
	databaseURL: env.REACT_APP_DATABASE_URL,
	projectId: env.REACT_APP_PROJECT_ID,
	storageBucket: env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
	appId: env.REACT_APP_APP_ID,
}

firebase.initializeApp(firebaseConfig)

// load default storage bucket
const firebaseDefaultStorage = firebase.storage()

const auth = firebase.auth

// use device default language
auth().useDeviceLanguage()

// user auth listener
auth().onAuthStateChanged(onAuthChanged)

// listener to get back sign in token from federated identity provider
getRedirectResult(auth().getRedirectResult(), auth)

const functions = firebase.functions()

export { functions, firebase, auth, firebaseDefaultStorage }