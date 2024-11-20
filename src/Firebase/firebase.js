// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from "firebase/auth" ; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn6WHoIWHSmk6W2rt8eh7Unbm5SpoOUkE",
  authDomain: "csums-793d5.firebaseapp.com",
  projectId: "csums-793d5",
  storageBucket: "csums-793d5.firebasestorage.app",
  messagingSenderId: "136157466896",
  appId: "1:136157466896:web:ea20d1c77201a7b0b09595",
  measurementId: "G-XXMNX2E7E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);