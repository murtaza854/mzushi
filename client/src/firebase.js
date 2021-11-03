import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
// import { useContext } from 'react';
// import { useHistory } from 'react-router';
import api from './api';
// import UserContext from './contexts/userContext';

initializeApp({
    apiKey: "AIzaSyBJqs4AR8o7P9HsxiZSehD0jYyI6dnfH7Q",
    authDomain: "auth.mzushi.com",
    projectId: "mzushi-a01a5",
    storageBucket: "mzushi-a01a5.appspot.com",
    messagingSenderId: "820007439309",
    appId: "1:820007439309:web:4e8eb5e93ec964a050d284"
});


const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const auth = getAuth();

export const signInWithGoogle = (user) => {
    signInWithPopup(auth, googleProvider).then(async (res) => {
        console.log(user);
        // const user = useContext(UserContext);
        // const history = useHistory();
        const credential = GoogleAuthProvider.credentialFromResult(res);
        console.log(credential);
        const response = await fetch(`${api}/startup/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            withCredentials: true,
            body: JSON.stringify({ user: res.user, provider: 'google', credential: credential })
        });
        // await signInWithCredential(auth, credential);
        const content = await response.json();
        const { displayName, email, emailVerified, accountSetup, admin } = content.data;
        user.setUserState({ displayName, email, emailVerified, accountSetup, admin });
        // user.setUserState({ displayName, email, emailVerified, accountSetup, admin });
        // if (accountSetup) history.push("/");
    }).catch((error) => {
        console.log(error.message);
    })
}

export const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider).then(async (res) => {
        const response = await fetch(`${api}/startup/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            withCredentials: true,
            body: JSON.stringify({ user: res.user, provider: 'facebook' })
        });
        const content = await response.json();
        console.log(content.data);
    }).catch((error) => {
        console.log(error.message);
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

