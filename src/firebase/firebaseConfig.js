import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCQrajlcYM1rwe3HVD63-6fscistFexR4Q",
  authDomain: "clone-front-end-9c150.firebaseapp.com",
  projectId: "clone-front-end-9c150",
  storageBucket: "clone-front-end-9c150.appspot.com",
  messagingSenderId: "292856672465",
  appId: "1:292856672465:web:b4c2da4071b2b687c6d5f0",
  measurementId: "G-GED6E56DRL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();////which is imported from firebase/app
export { db, auth }; //here we export db and auth to login component 