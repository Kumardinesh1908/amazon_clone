// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDffZxiV09SIgwLkQTBq2QQUHKComylkf4",
//   authDomain: "clone-24106.firebaseapp.com",
//   projectId: "clone-24106",
//   storageBucket: "clone-24106.appspot.com",
//   messagingSenderId: "1051051243854",
//   appId: "1:1051051243854:web:ffb26ae3c2e9c6d006461f",
//   measurementId: "G-2XQM42BH06"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyBIdAX5mU7sHrkS6F4RtfpGkiXRG4gk9Fs",
//   authDomain: "fir-c0029.firebaseapp.com",
//   projectId: "fir-c0029",
//   storageBucket: "fir-c0029.appspot.com",
//   messagingSenderId: "653873214071",
//   appId: "1:653873214071:web:81069ca0bde9c3f75a0c72"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDmR0xY-wl2NWZU190R2AwbSi0Ljq4JWx0",
  authDomain: "clone-4988a.firebaseapp.com",
  projectId: "clone-4988a",
  storageBucket: "clone-4988a.appspot.com",
  messagingSenderId: "890006816133",
  appId: "1:890006816133:web:41b7da969fa19530de70ec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);