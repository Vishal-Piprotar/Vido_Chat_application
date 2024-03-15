import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "quick-meet-app0.firebaseapp.com",
  projectId: "quick-meet-app0",
  storageBucket: "quick-meet-app0.appspot.com",
  messagingSenderId: "1089586674815",
  appId: "1:1089586674815:web:d32766e13a9ccb9243934a",
  measurementId: "G-BNYMNS0ETJ"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
