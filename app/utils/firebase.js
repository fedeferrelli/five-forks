import firebase from "firebase/app";
//import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDoVYV2KgHpYBcyq7ibIsGLZzDWl2oe4PI",
    authDomain: "tenedores-f6b4b.firebaseapp.com",
    projectId: "tenedores-f6b4b",
    storageBucket: "tenedores-f6b4b.appspot.com",
    messagingSenderId: "863200711130",
    appId: "1:863200711130:web:0dca474da5bd93cd76f0e3"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);
