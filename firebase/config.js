import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { FIREBASE_API } from "../config-global";

// Initialize Firebase
const app = initializeApp(FIREBASE_API);

// Initalize Firesore
const db = getFirestore(app);

module.exports = {
  db,
};
