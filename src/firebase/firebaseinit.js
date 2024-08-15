import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCsogpp-pQkhhXYPuYcIb2qrXOqli2tuM4",
  authDomain: "invoicev1-80b13.firebaseapp.com",
  projectId: "invoicev1-80b13",
  storageBucket: "invoicev1-80b13.appspot.com",
  messagingSenderId: "786016509011",
  appId: "1:786016509011:web:26518d37a575d9a2487aa6",
  measurementId: "G-N1ZXLB5QN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
