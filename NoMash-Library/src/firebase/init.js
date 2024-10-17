// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAaspieOh7_F2hhathaRwUe-ekcx-MZHI",
  authDomain: "fit5032-applied-xiaojun.firebaseapp.com",
  projectId: "fit5032-applied-xiaojun",
  storageBucket: "fit5032-applied-xiaojun.appspot.com",
  messagingSenderId: "901247874447",
  appId: "1:901247874447:web:b6de6b8a613b7b069247fa"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db