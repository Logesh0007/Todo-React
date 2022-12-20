import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "todo-a288c.firebaseapp.com",
  projectId: "todo-a288c",
  storageBucket: "todo-a288c.appspot.com",
  messagingSenderId: "689711303889",
  appId: "1:689711303889:web:1ba72f1d87403c2148c9f0",
  measurementId: "G-8HE6VHJJDH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "tasks");

export default db;
export { colRef };
