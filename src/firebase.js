// Only the Firebase pieces the app uses: the core, Auth (anonymous sign-in) and Firestore.
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Firebase web config values are public by design; access is controlled by firestore.rules.
const firebaseConfig = {
  apiKey: 'AIzaSyC0oSwy13OSbzMXgZAC5mpiStaZt0GfROc',
  authDomain: 'users-registry.firebaseapp.com',
  projectId: 'users-registry',
  storageBucket: 'users-registry.appspot.com',
  messagingSenderId: '343598029958',
  appId: '1:343598029958:web:56fe21f197f32d52b10507'
}

const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()
const serverTimestamp = () => firebase.firestore.FieldValue.serverTimestamp()

export { app, auth, db, serverTimestamp }
