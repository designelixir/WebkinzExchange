// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyC8N64TaMlK57dWpsg3Le7efjTIA2HV6mI",

  authDomain: "webkinz-exchange.firebaseapp.com",

  projectId: "webkinz-exchange",

  storageBucket: "webkinz-exchange.appspot.com",

  messagingSenderId: "548862565285",

  appId: "1:548862565285:web:d4aee0bbf52a5d11f0e64c",

  measurementId: "G-TXD6KH84XD"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);