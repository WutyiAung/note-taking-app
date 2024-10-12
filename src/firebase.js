import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDChONAb8Ec6mBe8Mi6YLtzc-xIVS183R8",
  authDomain: "note-taking-app-aef5f.firebaseapp.com",
  projectId: "note-taking-app-aef5f",
  storageBucket: "note-taking-app-aef5f.appspot.com",
  messagingSenderId: "230885347466",
  appId: "1:230885347466:web:18559f5f314b718b6d5d73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

// Get server timestamp
const timestamp = serverTimestamp();

export { db, serverTimestamp, auth };
