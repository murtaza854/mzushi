import dotenv from 'dotenv';
// import firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";



dotenv.config();

initializeApp({
    apiKey: "AIzaSyBJqs4AR8o7P9HsxiZSehD0jYyI6dnfH7Q",
    authDomain: "auth.mzushi.com",
    projectId: "mzushi-a01a5",
    storageBucket: "mzushi-a01a5.appspot.com",
    messagingSenderId: "820007439309",
    appId: "1:820007439309:web:4e8eb5e93ec964a050d284"
});


const provider = new GoogleAuthProvider();
const auth = getAuth();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
        console.log(res.user)
    }).catch((error) => {
        console.log(error.message)
    })
}


// export const auth = app.auth();
// const auth = getAuth();
// const googleProvider = new auth.GoogleAuthProvider()
// export const signInWithGoogle = () => {
//     auth.signInWithPopup(googleProvider).then((res) => {
//         console.log(res.user)
//     }).catch((error) => {
//         console.log(error.message)
//     })
// }

