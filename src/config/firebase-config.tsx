// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXanHt1efTq5dv419b6NHkCa91B775mNA",
  authDomain: "pantry-tracker-42112.firebaseapp.com",
  projectId: "pantry-tracker-42112",
  storageBucket: "pantry-tracker-42112.appspot.com",
  messagingSenderId: "969642776542",
  appId: "1:969642776542:web:54ebb824bffec5ca3f2f4f",
  measurementId: "G-3MV4HXWFVR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
