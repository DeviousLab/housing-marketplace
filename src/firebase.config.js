import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRD_W4WFjepv3tdIwbofm91olxvhNonjE",
  authDomain: "housing-marketplace-dd0ee.firebaseapp.com",
  projectId: "housing-marketplace-dd0ee",
  storageBucket: "housing-marketplace-dd0ee.appspot.com",
  messagingSenderId: "575999694574",
  appId: "1:575999694574:web:c951db9b709c7bc35245ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();