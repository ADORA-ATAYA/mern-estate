// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-61532.firebaseapp.com",
  projectId: "mern-estate-61532",
  storageBucket: "mern-estate-61532.appspot.com",
  messagingSenderId: "289743812324",
  appId: "1:289743812324:web:de4deaa41e2fc159f65ef1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);