// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtmOJpPIyL8TbFhr52AYmtNdF-SfW3IKo",
  authDomain: "dashboard-93006.firebaseapp.com",
  projectId: "dashboard-93006",
  storageBucket: "dashboard-93006.appspot.com",
  messagingSenderId: "338675934632",
  appId: "1:338675934632:web:2075c645b79e023c5d699d",
  measurementId: "G-40P2V087RG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);