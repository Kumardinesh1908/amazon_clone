// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDffZxiV09SIgwLkQTBq2QQUHKComylkf4",
  authDomain: "clone-24106.firebaseapp.com",
  projectId: "clone-24106",
  storageBucket: "clone-24106.appspot.com",
  messagingSenderId: "1051051243854",
  appId: "1:1051051243854:web:ffb26ae3c2e9c6d006461f",
  measurementId: "G-2XQM42BH06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;