const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const AdminUser = require('./schema').adminUser;

const firebaseFile = require('./firebase');
const firebase = firebaseFile.firebase;
const firebaseAdmin = firebaseFile.admin;

const url = process.env.DATABASE_URL;

const createServer = async (callback) => {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected!");
    let firstName = '';
    while (firstName === '') firstName = prompt('First name: ').trim();
    let lastName = '';
    while (lastName === '') lastName = prompt('Last name: ').trim();
    let email = '';
    while (email === '') email = prompt('Email: ').trim();
    let password = '';
    while (password === '' || password.length <= 6) password = prompt.hide('Password: ');
    const confirmPassword = prompt.hide('Confirm Password: ');
    if (password !== confirmPassword) {
        console.log('Passwords do not match... aboting!');
        process.exit(0);
    };
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = response.user;
    await firebaseAdmin.auth().setCustomUserClaims(user.uid, { admin: true });
    user.sendEmailVerification();
    await user.updateProfile({
        displayName: firstName,
    });
    // console.log(user);
    const newAdminUser = new AdminUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        uid: user.uid
    });
    await newAdminUser.save();
    console.log('Verification Email sent! Please verify to login');
    process.exit(0);

}

createServer();