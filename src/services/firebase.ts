// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS4801YylHnniBJd_7i2R-2SfSNK6zmrE",
  authDomain: "fishing-9684f.firebaseapp.com",
  projectId: "fishing-9684f",
  storageBucket: "fishing-9684f.appspot.com",
  messagingSenderId: "27463600815",
  appId: "1:27463600815:web:cea899fe8b2c8fe29e625a",
  measurementId: "G-TZB22Y5NKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);