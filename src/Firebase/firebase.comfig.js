// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr744c7OJ4nPlhTreE0x57ARcjtgMQb5o",
  authDomain: "user-email-password-auth-e5983.firebaseapp.com",
  projectId: "user-email-password-auth-e5983",
  storageBucket: "user-email-password-auth-e5983.appspot.com",
  messagingSenderId: "734190738846",
  appId: "1:734190738846:web:e58217914e1200da0d0a8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth