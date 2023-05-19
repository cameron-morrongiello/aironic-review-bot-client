import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { FIREBASE_API } from "../config-global";
console.log(FIREBASE_API);

// Initialize Firebase
const app = initializeApp(FIREBASE_API);

console.log(app);

// Initalize Firesore
const db = getFirestore(app);

console.log(db);

module.exports = {
  db,
};
