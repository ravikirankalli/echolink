import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOGCBWavxtWsnFZq43QNqNaWu-_0i6iWg",
  authDomain: "echolink-ca950.firebaseapp.com",
  projectId: "echolink-ca950",
  storageBucket: "echolink-ca950.firebasestorage.app",
  messagingSenderId: "462219144974",
  appId: "1:462219144974:web:1b93387b2d13c2dc21315f",
  measurementId: "G-15EN7GF9GZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
