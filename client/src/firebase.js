// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-58682.firebaseapp.com",
  projectId: "mern-blog-58682",
  storageBucket: "mern-blog-58682.appspot.com",
  messagingSenderId: "151255130453",
  appId: "1:151255130453:web:dec6ffeb08a1da36274fdc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

