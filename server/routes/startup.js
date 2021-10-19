const router = require('express').Router();
const Startup = require('../schema').startup;
const dotenv = require('dotenv');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const firebaseFile = require('../firebase');
const firebase = firebaseFile.firebase;
const firebaseAdmin = firebaseFile.admin;
dotenv.config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, contactNumber, password } = req.body;
        console.log(firstName, lastName, email, contactNumber, password);
        const response = await firebase.auth().createUserWithEmailAndPassword(email.name, password.name);
        const user = response.user;
        await firebaseAdmin.auth().setCustomUserClaims(user.uid, { admin: false });
        user.sendEmailVerification();
        await user.updateProfile({
            displayName: firstName.name,
        });
        const newStartup = new Startup({
            ownerFirstName: firstName.name,
            ownerLastName: lastName.name,
            email: email.name,
            contactNumber: contactNumber.name,
            active: true,
            premium: false,
            rating: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastLogin: new Date(),
            uid: user.uid
        });
        newStartup.save();
        await firebase.auth().signOut();
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false, error: error });
    }
});

router.post('/login', async (req, res) => {
    // console.log(req.body);
    try {
        const response = await firebase.auth().signInWithEmailAndPassword(req.body.email.name, req.body.password.name);
        const user = response.user;
        const idTokenResult = await user.getIdTokenResult();
        const admin = idTokenResult.claims.admin;
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const startup = await Startup.findOne({ uid: user.uid });
        const accountSetup = startup.accountSetup;
        if (!emailVerified) {
            user.sendEmailVerification();
            await firebase.auth().signOut();
            throw "Email not verified";
        } else res.json({ data: { displayName, email, emailVerified, accountSetup, admin } });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/mark-premium', async (req, res) => {
    try {
        console.log(req.body)
        const startup = await Startup.findOne({ email: req.body.user.email });
        startup.premium = req.body.mark;
        startup.save();
        res.json({ data: true });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

// router.post('/startup-setup', upload.sin)

router.post('/startup-setup', upload.single('image'), (req, res, next) => {
    try {
        console.log('      ');
        console.log(req.file);
        const obj = {
            name: req.file.fieldname,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/..' + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        console.log('------------------');
        console.log(obj);
        // imgModel.create(obj, (err, item) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         // item.save();
        //         res.redirect('/');
        //     }
        // });
        res.json({ data: false });
    } catch (error) {
        console.log(error);
        res.json({ data: false, error: error });
    }
});

module.exports = router;
