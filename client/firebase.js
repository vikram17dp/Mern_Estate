// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-cd30f.firebaseapp.com",
  projectId: "mern-estate-cd30f",
  storageBucket: "mern-estate-cd30f.appspot.com",
  messagingSenderId: "464676406363",
  appId: "1:464676406363:web:672fb213d150d7a2faeb7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;