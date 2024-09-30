// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAThO6PgCFLtF2z1zznjeXW1cBP36JdKvc',
  authDomain: 'delux-e35cd.firebaseapp.com',
  projectId: 'delux-e35cd',
  storageBucket: 'delux-e35cd.appspot.com',
  messagingSenderId: '463391973214',
  appId: '1:463391973214:web:f4abb269edd733911bb9cf',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const str = getStorage(app)
