import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgxSDVEiK6TW9afbQh2x7py3EVqJuagvo",
  authDomain: "meditation-music-pwa.firebaseapp.com",
  projectId: "meditation-music-pwa",
  storageBucket: "meditation-music-pwa.appspot.com",
  messagingSenderId: "815911202180",
  appId: "1:815911202180:web:b9c5640fc929d98fa581d1",
  measurementId: "G-4012F8L75P",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
