// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { 
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjrWx2-wHsAdFOEjXXMKaUQqZmy1m8Bh4",
  authDomain: "homepage-ff811.firebaseapp.com",
  projectId: "homepage-ff811",
  storageBucket: "homepage-ff811.firebasestorage.app",
  messagingSenderId: "860254209132",
  appId: "1:860254209132:web:799015d72647c456cac449",
  measurementId: "G-DMN3S97MVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut, deleteUser }