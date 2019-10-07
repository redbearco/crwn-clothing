import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCLGkNKRi31iZlUY8L_0MtIXs6BTBB7MUg",
    authDomain: "hidden-lyceum-235816.firebaseapp.com",
    databaseURL: "https://hidden-lyceum-235816.firebaseio.com",
    projectId: "hidden-lyceum-235816",
    storageBucket: "",
    messagingSenderId: "19321551475",
    appId: "1:19321551475:web:3630e06e5f728afc024806"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
