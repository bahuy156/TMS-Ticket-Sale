import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmIAWCL0iU0CYuOY-0bfsXktMassegdWk",
  authDomain: "ticket-55c99.firebaseapp.com",
  projectId: "ticket-55c99",
  storageBucket: "ticket-55c99.appspot.com",
  messagingSenderId: "790064245676",
  appId: "1:790064245676:web:d18ed627064f5b15e7a809",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;
