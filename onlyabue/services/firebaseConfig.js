import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA1eVXH6MoW-HdH0ENnPF9iE47IQqeEm70",
    authDomain: "abueapp-d3758.firebaseapp.com",
    databaseURL: "https://abueapp-d3758-default-rtdb.firebaseio.com",
    projectId: "abueapp-d3758",
    storageBucket: "abueapp-d3758.appspot.com",
    messagingSenderId: "619524224303",
    appId: "1:619524224303:web:1f36ff21f93f7c568c5dda",
    measurementId: "G-FDVRKXDNGQ"
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); //

export { firestore };