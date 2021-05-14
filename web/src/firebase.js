import firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBjybDRwvEbpXLzQOzXvDpzqRyM9DGTn88",
    authDomain: "pfedefib.firebaseapp.com",
    projectId: "pfedefib",
    storageBucket: "pfedefib.appspot.com",
    messagingSenderId: "1000808926703",
    appId: "1:1000808926703:web:50458ba163a100331a7a1a",
    measurementId: "G-BQBFN74MCC"
  };

firebase.initializeApp(firebaseConfig)

export default firebase;