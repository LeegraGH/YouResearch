// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firestoreConfig = {
    apiKey: "AIzaSyDU7MmQIz7jGc1eE4vqQYbIPjtnapEi14g",
    authDomain: "word-anixx.firebaseapp.com",
    projectId: "word-anixx",
    storageBucket: "word-anixx.appspot.com",
    messagingSenderId: "401371127835",
    appId: "1:401371127835:web:e63e4900090c2c324a18be",
    measurementId: "G-PDXLG346EM"
};

// Initialize Firebase
const app = initializeApp(firestoreConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);