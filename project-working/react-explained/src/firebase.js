import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyC926Gax05drb2mjN52IX1k55G1FK0Ulj4",
    authDomain: "react-explained-demo.firebaseapp.com",
    projectId: "react-explained-demo",
    storageBucket: "react-explained-demo.appspot.com",
    messagingSenderId: "915550129959",
    appId: "1:915550129959:web:7a0ba6704ee0b5a7602302",
    measurementId: "G-5N5FKNPT9W"
}

firebase.initializeApp(firebaseConfig)

export default firebase;