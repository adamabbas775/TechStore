import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDYY6I7fQfykwaSLSsArfQIFtZkI2eletU',
  authDomain: 'react-challenge.firebaseapp.com',
  projectId: 'react-challenge',
  storageBucket: 'react-challenge.appspot.com',
  messagingSenderId: '401016908464',
  appId: '1:401016908464:web:68bfa910075513982f6975',
  measurementId: 'G-GL592V56KC',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {db, auth, storage};
