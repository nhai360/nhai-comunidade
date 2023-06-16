import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1BMm0QsIYzb6XX-W_QZfvtgqMo82q_sA",
  authDomain: "contai-chat.firebaseapp.com",
  projectId: "contai-chat",
  storageBucket: "contai-chat.appspot.com",
  messagingSenderId: "872721862097",
  appId: "1:872721862097:web:9291c6e093585efd7a64f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
