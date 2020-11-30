import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyBQ1DE-SB3tZLiEGqvOh5RdUFcMlsoj7Rw',
  authDomain: 'fypticktalk.firebaseapp.com',
  databaseURL: 'https://fypticktalk.firebaseio.com',
  projectId: 'fypticktalk',
  storageBucket: 'fypticktalk.appspot.com',
  messagingSenderId: '46564369288',
  appId: '1:46564369288:web:38a67725169e1e9b2a103d',
  measurementId: 'G-W43LHB11QH',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
