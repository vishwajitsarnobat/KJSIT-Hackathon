// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo_5_l-Vxldqw_M_37IqxnvbPVFJL7Tp8",
  authDomain: "react-auth-f499a.firebaseapp.com",
  projectId: "react-auth-f499a",
  storageBucket: "react-auth-f499a.appspot.com",
  messagingSenderId: "861158671908",
  appId: "1:861158671908:web:7feaa0dd4fa76fa69cfab1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Firebase Authentication
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
