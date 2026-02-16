import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACd7ZRGWkKAKOahuW66fEqJ3gOoy1-J3Y",
  authDomain: "test-23417.firebaseapp.com",
  databaseURL: "https://test-23417-default-rtdb.firebaseio.com",
  projectId: "test-23417",
  storageBucket: "test-23417.firebasestorage.app",
  messagingSenderId: "956698965647",
  appId: "1:956698965647:web:cb6e6d221e88b0dd92e2fa",
  measurementId: "G-E1R493NTZM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
