import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBb4Vp3iK0QGNU9J9WnGn3uJWgA6RW-Z6k",
    authDomain: "podcast-nomination.firebaseapp.com",
    databaseURL: "https://podcast-nomination.firebaseio.com",
    projectId: "podcast-nomination",
    storageBucket: "podcast-nomination.appspot.com",
    messagingSenderId: "911506664031",
    appId: "1:911506664031:web:96c399b5ead25ddd8109ea"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;