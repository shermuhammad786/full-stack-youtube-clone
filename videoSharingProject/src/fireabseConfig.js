import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBUNOUnJQbFf-vvmVnA_mzfDnpEKcO36Mo",
    authDomain: "video-sharing-68080.firebaseapp.com",
    projectId: "video-sharing-68080",
    storageBucket: "video-sharing-68080.appspot.com",
    messagingSenderId: "178497915823",
    appId: "1:178497915823:web:be2c85428c47264c61bd5a"
  };

// Initialize Firebae
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()

export default app