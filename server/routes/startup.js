const router = require('express').Router();
const Startup = require('../schema').startup;
const Category = require('../schema').category;
const Address = require('../schema').address;
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
        cb(null, path.resolve('../client/public/startupUploads'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

router.get('/table-data', async (req, res) => {
    const startups = await Startup.find({});
    if (!startups) res.json({ data: [] });
    else res.json({ data: startups });
});

router.get('/get-all-by-category', async (req, res) => {
    const { categorySlug } = req.query;
    const category = await Category.findOne({ slug: categorySlug });
    const startups = await Startup.find({ category: category });
    if (!startups) res.json({ data: [] });
    else res.json({ data: startups });
});

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, contactNumber, password } = req.body;
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

router.post('/startup-setup', upload.single('image'), async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data);
        const startup = await Startup.findOne({ email: data.user.email });
        startup.startupName = data.businessName;
        startup.logo = {
            data: fs.readFileSync((path.resolve('../client/public/startupUploads') + '/' + req.file.filename)),
            contentType: req.file.mimetype
        };
        startup.description = data.businessDescription;
        startup.minPrice = data.minPrice;
        startup.maxPrice = data.maxPrice;
        startup.website = data.webUrl;
        startup.moneyClass = data.alignment;
        startup.activeDays = data.activeDays;
        startup.category = data.category;
        const address = new Address({
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            landmark: data.landmark,
            area: data.area[0]
        });
        address.save();
        startup.address = address;
        startup.delivery = data.radios.delivery;
        startup.service = data.radios.service;
        startup.serviceAreas = data.areaDS;
        startup.serviceCities = data.cityDS;
        startup.serviceProvinces = data.provinceDS;
        startup.accountSetup = true;
        startup.save();
        // const obj = {
        //     name: req.file.fieldname,
        //     img: {
        //         data: fs.readFileSync(path.join(__dirname + '/..' + '/uploads/' + req.file.filename)),
        //         contentType: 'image/png'
        //     }
        // }
        // const newStartup = new Startup({
        //     name: data.name,
        //     slug: slugify(data.name, { lower: true }),
        //     keywords: data.keywords,
        //     description: data.description,
        //     image: {
        //         data: fs.readFileSync((path.resolve('../client/public/categoryUploads') + '/' + req.file.filename)),
        //         contentType: req.file.mimetype
        //     },
        //     featured: data.featured
        // });
        // console.log('------------------');
        // console.log(obj);
        // imgModel.create(obj, (err, item) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         // item.save();
        //         res.redirect('/');
        //     }
        // });
        res.json({ data: 'success' });
    } catch (error) {
        console.log(error);
        res.json({ data: false, error: error });
    }
});

module.exports = router;
