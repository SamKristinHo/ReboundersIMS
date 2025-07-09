/**
 * This is where firebase config is
 */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChYyFqTCcbcCI7VeI71ISUY62raouFfSw",
  authDomain: "reboundersauth.firebaseapp.com",
  projectId: "reboundersauth",
  storageBucket: "reboundersauth.firebasestorage.app",
  messagingSenderId: "637566563138",
  appId: "1:637566563138:web:61bccb7cd1391e24dd4edb",
  measurementId: "G-76LRYZZJ5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { app, auth };
