// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: "twitter-clone-481bb.firebaseapp.com",
    projectId: "twitter-clone-481bb",
    storageBucket: "twitter-clone-481bb.appspot.com",
    messagingSenderId: "634307062467",
    appId: "1:634307062467:web:f226209754fc0f30159076"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);