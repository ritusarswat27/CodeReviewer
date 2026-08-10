import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBesD9b5Gr0Uc4GfU4JEDdoS4X1sBMyFXg",
  authDomain: "codereview-bf5d4.firebaseapp.com",
  projectId: "codereview-bf5d4",
  storageBucket: "codereview-bf5d4.firebasestorage.app",
  messagingSenderId: "271621257733",
  appId: "1:271621257733:web:51a54de19228ffea867a6c",
  measurementId: "G-2VVLNB0JX6",
  databaseURL: "https://codereview-bf5d4-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
