const router = require('express').Router();
const AdminUser = require('../schema').adminUser;
const dotenv = require('dotenv');
const firebaseFile = require('../firebase');
const firebase = firebaseFile.firebase;
const firebaseAdmin = firebaseFile.admin;
dotenv.config();

router.get('/table-data', async (req, res) => {
    const adminUsers = await AdminUser.find({}, { uid: 0 });
    if (!adminUsers) res.json({ data: [] });
    else res.json({ data: adminUsers });
});

router.post('/login', async (req, res) => {
    try {
        const response = await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password);
        const user = response.user;
        const idTokenResult = await user.getIdTokenResult()
        if (!!idTokenResult.claims.admin && user.emailVerified) {
            res.json({ loggedIn: true });
        } else {
            await firebase.auth().signOut();
            throw 'Either user does not exist or email has not yet been verified!'
        }
    } catch (error) {
        res.json({ loggedIn: false, error: error });
    }
});

router.get('/logged-in', async (req, res) => {
    try {
        res.json({ loggedIn: true, data: firebase.auth().currentUser });
    } catch (error) {
        res.json({ loggedIn: false, error: error });
    }
});

router.post('/logout', async (req, res) => {
    try {
        await firebase.auth().signOut();
        res.json({ loggedIn: false });
    } catch (error) {
        res.json({ loggedIn: false, error: error });
    }
});

router.post('/add', async (req, res) => {
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password);
        const user = response.user;
        await firebaseAdmin.auth().setCustomUserClaims(user.uid, { admin: true });
        user.sendEmailVerification();
        await user.updateProfile({
            displayName: `${req.body.firstName} ${req.body.lastName}`,
        });
        const newAdminUser = new AdminUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            uid: user.uid
        });
        newAdminUser.save();
        await firebase.auth().signOut();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error });
    }
});

router.get('/get-by-ids', async (req, res) => {
    try {
        let id = '';
        if ('id' in req.query) id = req.query.id;
        const getIds = id.split(',');
        const adminUsers = await AdminUser.find({ _id: getIds });
        res.json({ data: adminUsers });
    } catch (error) {
        res.json({ data: [], error: error });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const adminUsers = await AdminUser.find({ _id: req.body.ids }, { uid: 1 });
        adminUsers.forEach(async admin => {
            await firebaseAdmin.auth().deleteUser(admin.uid)
        })
        await AdminUser.deleteMany({ _id: req.body.ids });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error });
    }
});

module.exports = router;