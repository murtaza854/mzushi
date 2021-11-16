import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
const auth = getAuth();

export const onSignIn = (googleUser, user) => {
    try {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (true) {
                console.log('We are authenticated', firebaseUser);
                // Build Firebase credential with the Google ID token.
                const response = await fetch(`${api}/startup/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    withCredentials: true,
                    body: JSON.stringify({ provider: 'google', id_token: googleUser.getAuthResponse().id_token })
                });
                const content = await response.json();
                if (content.data) {
                    const response1 = await fetch(`${api}/logged-in`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        withCredentials: true,
                    });
                    const content1 = await response1.json();
                    const { displayName, email, emailVerified, accountSetup, admin, provider } = content1.data;
                    user.setUserState({ displayName, email, emailVerified, accountSetup, admin, provider });
                }
                // Sign in with credential from the Google user.
                // signInWithCredential(auth, credential).catch((error) => {
                //   // Handle Errors here.
                //   const errorCode = error.code;
                //   const errorMessage = error.message;
                //   // The email of the user's account used.
                //   const email = error.email;
                //   // The credential that was used.
                //   const credential = GoogleAuthProvider.credentialFromError(error);
                //   // ...
                // });
            } else {
                console.log('User already signed-in Firebase.');
            }
        });
    } catch (error) {
    }
}


// export const signInWithGoogle = (user) => {
//     signInWithPopup(auth, googleProvider).then(async (res) => {
//         console.log(res.user);
//         // await signInWithCredential(credential);
//         // const response = await fetch(`${api}/startup/login`, {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     },
//         //     credentials: 'include',
//         //     withCredentials: true,
//         //     body: JSON.stringify({ user: res.user, provider: 'google', credential: credential, id_token: id_token })
//         // });
//         // // await signInWithCredential(auth, credential);
//         // const content = await response.json();
//         // const { displayName, email, emailVerified, accountSetup, admin } = content.data;
//         // user.setUserState({ displayName, email, emailVerified, accountSetup, admin });
//         // user.setUserState({ displayName, email, emailVerified, accountSetup, admin });
//         // if (accountSetup) history.push("/");
//     }).catch((error) => {
//         console.log(error.message);
//     })
// }

// export const signInWithFacebook = () => {
//     signInWithPopup(auth, facebookProvider).then(async (res) => {
//         const response = await fetch(`${api}/startup/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//             withCredentials: true,
//             body: JSON.stringify({ user: res.user, provider: 'facebook' })
//         });
//         const content = await response.json();
//         console.log(content.data);
//     }).catch((error) => {
//         console.log(error.message);
//     })
// }

export const responseFacebook = async user => {
    try {
        const { authResponse } = await new Promise(window.FB.login);
        const response = await fetch(`${api}/startup/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            withCredentials: true,
            body: JSON.stringify({ provider: 'facebook', accessToken: authResponse.accessToken })
        });
        const content = await response.json();
        if (content.data) {
            const response1 = await fetch(`${api}/logged-in`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                withCredentials: true,
            });
            const content1 = await response1.json();
            const { displayName, email, accountSetup, admin, provider } = content1.data;
            user.setUserState({ displayName, email, emailVerified: true, accountSetup, admin, provider });
        }
        // const { displayName, email, emailVerified, accountSetup, admin, provider } = content.data;
        // user.setUserState({ displayName, email, emailVerified, accountSetup, admin, provider });
    } catch (error) {

    }
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

