import firebase from "firebase";
require("firebase/firestore");

// Initialize Firebase

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0oSwy13OSbzMXgZAC5mpiStaZt0GfROc",
    authDomain: "users-registry.firebaseapp.com",
    databaseURL: "https://users-registry.firebaseio.com",
    projectId: "users-registry",
    storageBucket: "users-registry.appspot.com",
    messagingSenderId: "343598029958",
    appId: "1:343598029958:web:56fe21f197f32d52b10507",
    measurementId: "G-PS5YMLZ9RF"
};

const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export {fb,db};
