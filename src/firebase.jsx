// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCft7Kgu2psUtx2dQcLE0acWnuRujL7jkk",
  authDomain: "map-ast-bd5e8.firebaseapp.com",
  projectId: "map-ast-bd5e8",
  storageBucket: "map-ast-bd5e8.firebasestorage.app",
  messagingSenderId: "997636774085",
  appId: "1:997636774085:web:70bc07169ec07bd74d78ac",
  measurementId: "G-VPSMZ46SGN",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
