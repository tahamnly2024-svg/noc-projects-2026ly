import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpjJDWLLVp2pgWTJJYzYL-GXspMVB1FV4",
  authDomain: "noc-projects-system.firebaseapp.com",
  projectId: "noc-projects-system",
  storageBucket: "noc-projects-system.firebasestorage.app",
  messagingSenderId: "602116432962",
  appId: "1:602116432962:web:9ff46fd9e0dca4ce48b9db"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
