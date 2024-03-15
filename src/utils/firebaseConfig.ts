import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "vido-chat-app.firebaseapp.com",
  projectId: "vido-chat-app",
  storageBucket: "vido-chat-app.appspot.com",
  messagingSenderId: "16828071225",
  appId: "1:16828071225:web:7d317db9feddd8ec273ce8",
  measurementId: "G-CP3K2JMEQX"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
