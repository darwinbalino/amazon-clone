import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCl83iXEOEGpQjXsUfQypP0tOHqlPWde-w",
  authDomain: "clone-e0e85.firebaseapp.com",
  projectId: "clone-e0e85",
  storageBucket: "clone-e0e85.appspot.com",
  messagingSenderId: "4328275768",
  appId: "1:4328275768:web:81f2d736b6d69ad61b8bcd",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
