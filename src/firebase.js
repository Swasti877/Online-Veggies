import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKlisOhhVaZdliHSk7GgSbN_8famrfgoY",
  authDomain: "online-veggies-2bac6.firebaseapp.com",
  projectId: "online-veggies-2bac6",
  storageBucket: "online-veggies-2bac6.appspot.com",
  messagingSenderId: "182826759549",
  appId: "1:182826759549:web:7ba84932fb81b35173c814",
  measurementId: "G-DTRMJWC5YC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
console.log(firebase.storage)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebaseApp.storage();


export {db, auth, storage};