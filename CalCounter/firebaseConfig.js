// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebase from 'firebase/app';
import 'firebase/database';

// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import Constants from 'expo-constants';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectID,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
  measurementId: Constants.expoConfig.extra.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export const fireDB = getFirestore();
export const db = getDatabase(app)
// export const dbRef = db.ref('data');
export default app;