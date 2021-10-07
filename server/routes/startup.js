const router = require('express').Router();
const Startup = require('../schema').startup;
const dotenv = require('dotenv');
const firebaseFile = require('../firebase');
const firebase = firebaseFile.firebase;
const firebaseAdmin = firebaseFile.admin;
dotenv.config();

router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        // const { firstName, lastName, email, contactNumber, password } = req.body;
        // const response = await firebase.auth().createUserWithEmailAndPassword(email.name, password.name);
        // const user = response.user;
        // // await firebaseAdmin.auth().setCustomUserClaims(user.uid, { admin: false });
        // user.sendEmailVerification();
        // await user.updateProfile({
        //     displayName: firstName.name,
        // });
        // const newStartup = new Startup({
        //     ownerFirstName: firstName.name,
        //     ownerLastName: lastName.name,
        //     email: email.name,
        //     contactNumber: contactNumber.name,
        //     active: true,
        //     premium: false,
        //     rating: 0,
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        //     lastLogin: new Date(),
        //     uid: user.uid
        // });
        // newStartup.save();
        // await firebase.auth().signOut();
        res.json({ data: true });
    } catch (error) {
        // res.json({ success: false, error: error });
        res.json({ data: false });
    }
});

module.exports = router;
