import firebase from "firebase";
require("firebase/firestore");

// Initialize Firebase

var config = {
    apiKey: "AIzaSyC0oSwy13OSbzMXgZAC5mpiStaZt0GfROc",
    authDomain: "users-registry.firebaseapp.com",
    databaseURL: "https://users-registry.firebaseio.com",
    projectId: "users-registry",
    storageBucket: "users-registry.appspot.com",
    messagingSenderId: "343598029958",
    appId: "1:343598029958:web:56fe21f197f32d52b10507",
    measurementId: "G-PS5YMLZ9RF"
};

const fb = firebase.initializeApp(config);
const db = firebase.firestore();

export {fb,db};
