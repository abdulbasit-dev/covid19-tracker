import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyChHnDaFMH_yvUrlkwSzyxQ3AcTuRCfi94',
  authDomain: 'covid19-tracker-60221.firebaseapp.com',
  databaseURL: 'https://covid19-tracker-60221.firebaseio.com',
  projectId: 'covid19-tracker-60221',
  storageBucket: 'covid19-tracker-60221.appspot.com',
  messagingSenderId: '980743798768',
  appId: '1:980743798768:web:535789ca8c46eeef832735',
  measurementId: 'G-ZCCRTXPVTG',
})

const db = firebaseApp.firestore()

export {db}
