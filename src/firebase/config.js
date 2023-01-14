// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"
import { getEnviroments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID, 
  VITE_APPID
} = getEnviroments()

// Your web app's Firebase configuration
//dev/prod
// const firebaseConfig = {
//   apiKey: "AIzaSyAymqIh7mcqZ8clbGyUD-Jmpow7SUVOcNM",
//   authDomain: "react-redux-33f48.firebaseapp.com",
//   projectId: "react-redux-33f48",
//   storageBucket: "react-redux-33f48.appspot.com",
//   messagingSenderId: "7395482250",
//   appId: "1:7395482250:web:16b1c950b7297c97c82b73"
// };

// testing
// const firebaseConfig = {
//   apiKey: "AIzaSyAymqIh7mcqZ8clbGyUD-Jmpow7SUVOcNM",
//   authDomain: "react-redux-33f48.firebaseapp.com",
//   projectId: "react-redux-33f48",
//   storageBucket: "react-redux-33f48.appspot.com",
//   messagingSenderId: "7395482250",
//   appId: "1:7395482250:web:73d77e14abb7b1a0c82b73"
// };

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSen: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp)