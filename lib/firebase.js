// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlyGPf9vVmCdmA3Y59zpVpTxorhBrXo-U",
  authDomain: "odyssey-app-3ed3f.firebaseapp.com",
  projectId: "odyssey-app-3ed3f",
  storageBucket: "odyssey-app-3ed3f.firebasestorage.app",
  messagingSenderId: "48616976422",
  appId: "1:48616976422:web:6fa5049813c8be83bd36e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);