import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyBgjwW40ZdASgXpPiv8RR4T2OeedzC3Gog",
  authDomain: "chamindu-11ecd.firebaseapp.com",
  databaseURL: "https://chamindu-11ecd-default-rtdb.firebaseio.com",
  projectId: "chamindu-11ecd",
  storageBucket: "chamindu-11ecd.firebasestorage.app",
  messagingSenderId: "264855530601",
  appId: "1:264855530601:web:23272e3bd88da1541406f8",
  measurementId: "G-F3D74F5VNB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
