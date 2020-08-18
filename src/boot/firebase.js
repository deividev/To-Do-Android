import * as firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:
var firebaseConfig = {
    apiKey: "AIzaSyB3CuqUF0AMgGgGK0xn6mnbi3fEJleCbck",
    authDomain: "to-do-quasar-9eb51.firebaseapp.com",
    databaseURL: "https://to-do-quasar-9eb51.firebaseio.com",
    projectId: "to-do-quasar-9eb51",
    storageBucket: "to-do-quasar-9eb51.appspot.com",
    messagingSenderId: "300177709518",
    appId: "1:300177709518:web:17c8622bf3163c525e339f",
    measurementId: "G-WRFT437H5T"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };
