const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'health-a6022.firebaseapp.com',
  databaseURL: 'https://health-a6022.firebaseio.com',
  projectId: 'health-a6022',
  storageBucket: 'health-a6022.appspot.com',
  messagingSenderId: '985473366452',
  appId: '1:985473366452:web:3c0af57e74f85a75cbdae1'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
