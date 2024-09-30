// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAQJDHU38Z8TEIgxCH9Sbs4uzYTlAOBrsk',
  authDomain: 'flexiunions2.firebaseapp.com',
  projectId: 'flexiunions2',
  storageBucket: 'flexiunions2.appspot.com',
  messagingSenderId: '603603708266',
  appId: '1:603603708266:web:bd809db3a69f2145885d13',
}

// old database
// apiKey: 'AIzaSyCm5r5_HdNiMjDh2rEH4OtY9XvmH21PyqE',
// authDomain: 'flexiunion-31295.firebaseapp.com',
// projectId: 'flexiunion-31295',
// storageBucket: 'flexiunion-31295.appspot.com',
// messagingSenderId: '66831723858',
// appId: '1:66831723858:web:ac8e3dcec87ca0c9a99e8b',

// older database
// apiKey: 'AIzaSyBbK-qHOVKNVgqS2ti80Vz4OLsSmfnohNg',
// authDomain: 'carb-3d263.firebaseapp.com',
// projectId: 'carb-3d263',
// storageBucket: 'carb-3d263.appspot.com',
// messagingSenderId: '731554195514',
// appId: '1:731554195514:web:327340c2b0fe7e377a6d03',
// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const str = getStorage(app)
