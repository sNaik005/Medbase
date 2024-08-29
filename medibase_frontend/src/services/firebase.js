
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDtvC5L1Shb8YCK9L06pULuLuXxeDZUJvc",
    authDomain: "human-medical-ecosystem.firebaseapp.com",
    databaseURL: "https://human-medical-ecosystem-default-rtdb.firebaseio.com",
    projectId: "human-medical-ecosystem",
    storageBucket: "human-medical-ecosystem.appspot.com",
    messagingSenderId: "729868141304",
    appId: "1:729868141304:web:6c5ff8d9afc711d78b710d"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
