const router = require('express').Router();
const mongoose = require('mongoose');
const Startup = require('../schema').startup;
const Category = require('../schema').category;
const Area = require('../schema').area;
const Address = require('../schema').address;
const slugify = require('slugify');
const dotenv = require('dotenv');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { signInWithEmailAndPassword, signOut, getAuth, signInWithCredential, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, updateProfile, sendPasswordResetEmail } = require('firebase/auth');
const firebaseFile = require('../firebase');
const firebaseAdmin = firebaseFile.admin;
dotenv.config();

const auth = getAuth();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('../client/public/startupUploads'))
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

router.get('/table-data', async (req, res) => {
    const startups = await Startup.find({});
    if (!startups) res.json({ data: [] });
    else res.json({ data: startups });
});

router.get('/get-logged-in', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session || "";
        if (sessionCookie) {
            const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
            if (user) {
                const uid = user.uid;
                const startup = await Startup.findOne({ uid: uid }).populate("category").populate("features").populate('serviceProvinces').populate('serviceCities').populate('serviceAreas').populate({
                    path: 'address',
                    populate: {
                        path: 'area',
                        populate: {
                            path: 'city',
                            populate: {
                                path: 'province',
                            }
                        }
                    }
                });
                res.json({ data: startup });
            } else res.json({ data: null })
        } else res.json({ data: null })
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.get('/get-mzushi-choice', async (req, res) => {
    try {
        const city = JSON.parse(req.query.city);
        delete city.active;
        const areas = await Area.find({ city: city });
        const addresses = await Address.find({ area: areas });
        const startups = await Startup.find({ mzushiChoice: true, address: addresses }).populate("category");
        if (!startups) res.json({ data: [] });
        else res.json({ data: startups });
    } catch (error) {
        res.json({ data: [] });
    }
});

router.get('/get-one-by-category-startup', async (req, res) => {
    const { categorySlug, startupSlug } = req.query;
    const category = await Category.findOne({ slug: categorySlug });
    const startup = await Startup.findOne({ category: category, slug: startupSlug }).populate("category").populate("features").populate('serviceProvinces').populate('serviceCities').populate('serviceAreas').populate({
        path: 'address',
        populate: {
            path: 'area',
            populate: {
                path: 'city',
                populate: {
                    path: 'province',
                }
            }
        }
    });
    if (!startup) res.json({ data: null });
    else res.json({ data: startup });
});

router.get('/get-all-by-category', async (req, res) => {
    const { categorySlug } = req.query;
    if (categorySlug === 'directory') {
        const startups = await Startup.find({}).populate("category").populate("features").populate({
            path: 'address',
            populate: {
                path: 'area',
                populate: {
                    path: 'city',
                    populate: {
                        path: 'province',
                    }
                }
            }
        });
        if (!startups) res.json({ data: [] });
        else res.json({ data: startups });
    } else {
        const category = await Category.findOne({ slug: categorySlug });
        const startups = await Startup.find({ category: category }).populate("category").populate("features").populate({
            path: 'address',
            populate: {
                path: 'area',
                populate: {
                    path: 'city',
                    populate: {
                        path: 'province',
                    }
                }
            }
        });
        if (!startups) res.json({ data: [] });
        else res.json({ data: startups });
    }
});

router.post('/signup', async (req, res) => {
    const { provider } = req.body;
    try {
        if (provider === 'email-password') {
            const { firstName, lastName, email, contactNumber, password } = req.body;
            const response = await createUserWithEmailAndPassword(auth, email.name, password.name);
            const user = response.user;
            await firebaseAdmin.auth().setCustomUserClaims(user.uid, { admin: false });
            sendEmailVerification(user);
            await updateProfile(user, {
                displayName: firstName.name,
            })
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
                uid: user.uid,
                provider: provider
            });
            newStartup.save();
            await signOut();
            res.json({ data: true });
        }
    } catch (error) {
        console.log(error);
        res.json({ data: false, error: error });
    }
});
router.get('/get-startups-search', async (req, res) => {
    try {
        const { startupText, city } = req.query;
        const startups = await Startup.find({ name: { "$regex": startupText, "$options": "i" }, city: JSON.parse(city) });
        res.json({ data: startups });
    } catch (error) {
        res.json({ data: [] });
    }
});

router.get('/logout', async (req, res) => {
    try {
        await signOut();
        res.json({ data: null });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/change-password', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session;
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        const email = user.email;
        const credential = EmailAuthProvider.credential(
            email,
            req.body.oldPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, req.body.password);
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false });
    }
});

router.post('/change-email', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session;
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        const email = user.email;
        const newEmail = req.body.email;
        const credential = EmailAuthProvider.credential(
            email,
            req.body.password
        );
        await reauthenticateWithCredential(user, credential);

        const dbUser = await Startup.findOne({ uid: user.uid });
        if (email !== newEmail) {
            await updateEmail(user, newEmail);
            sendEmailVerification(user);
            dbUser.email = newEmail;
            dbUser.save();
        }
        const idToken = await user.getIdToken();
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookieNew = await firebaseAdmin.auth().createSessionCookie(idToken, { expiresIn });
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookieNew, options);
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false });
    }
});

router.post('/change-owner-info', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session;
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        const dbUser = await Startup.findOne({ uid: user.uid });
        await updateProfile(user, {
            displayName: req.body.firstName,
        })
        dbUser.ownerFirstName = req.body.firstName;
        dbUser.ownerLastName = req.body.lastName;
        dbUser.contactNumber = req.body.contactNumber;
        dbUser.save();
        const displayName = user.name;
        const email = user.email;
        const emailVerified = user.emailVerified || user.email_verified;
        const admin = user.admin;
        const accountSetup = dbUser.accountSetup;
        const provider = startup.provider;
        res.json({ data: { displayName, email, emailVerified, accountSetup, admin, provider }, check: true });
    } catch (error) {
        console.log(error);
        res.json({ check: false });
    }
});

router.post('/send-password-reset-link', async (req, res) => {
    try {
        await sendPasswordResetEmail(auth, req.body.email);
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false });
    }
});

// console.log(firebase.auth.Auth.Persistence.NONE);

router.post('/login', async (req, res) => {
    const { provider } = req.body;
    console.log(provider);
    try {
        if (provider === 'email-password') {
            const response = await signInWithEmailAndPassword(auth, req.body.email.name, req.body.password.name)
            const user = response.user;
            if (!user.emailVerified) sendEmailVerification(user);
            const idToken = await user.getIdToken();
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            const sessionCookie = await firebaseAdmin.auth().createSessionCookie(idToken, { expiresIn });
            const options = { maxAge: expiresIn, httpOnly: true };
            res.cookie("session", sessionCookie, options);
            signOut(auth);
            res.json({ data: true });
        } else if (provider === 'google') {
            const { id_token } = req.body;
            const credential = GoogleAuthProvider.credential(id_token);
            const response = await signInWithCredential(auth, credential);
            const user = response.user;
            const idToken = await user.getIdToken();
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            const sessionCookie = await firebaseAdmin.auth().createSessionCookie(idToken, { expiresIn });
            const options = { maxAge: expiresIn, httpOnly: true };
            res.cookie("session", sessionCookie, options);
            signOut(auth);
            const startup = await Startup.findOne({ uid: user.uid });
            if (startup) {
                res.json({ data: true });
            } else {
                const newStartup = new Startup({
                    ownerFirstName: user.displayName,
                    ownerLastName: '',
                    email: user.email,
                    contactNumber: '',
                    active: true,
                    premium: false,
                    rating: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    lastLogin: new Date(),
                    uid: user.uid,
                    provider: provider
                });
                newStartup.save();
                res.json({ data: true });
            }
        } else if (provider === 'facebook') {
            const { accessToken } = req.body;
            const credential = FacebookAuthProvider.credential(accessToken);
            const response = await signInWithCredential(auth, credential);
            const user = response.user;
            const idToken = await user.getIdToken();
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            const sessionCookie = await firebaseAdmin.auth().createSessionCookie(idToken, { expiresIn });
            const options = { maxAge: expiresIn, httpOnly: true };
            res.cookie("session", sessionCookie, options);
            signOut(auth);
            const startup = await Startup.findOne({ uid: user.uid });
            if (startup) {
                res.json({ data: true });
            } else {
                const newStartup = new Startup({
                    ownerFirstName: user.displayName,
                    ownerLastName: '',
                    email: user.email,
                    contactNumber: '',
                    active: true,
                    premium: false,
                    rating: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    lastLogin: new Date(),
                    uid: user.uid,
                    provider: provider
                });
                newStartup.save();
                res.json({ data: true });
            }
        }
    } catch (error) {
        console.log(error);
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

router.post('/add-product-service', upload.single('image'), async (req, res, next) => {
    try {
        const sessionCookie = req.cookies.session;
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        const startup = await Startup.findOne({ uid: user.uid });
        const data = JSON.parse(req.body.data);
        if (req.file) {
            const image = {
                fileName: req.file.filename,
                filePath: '/startupUploads/' + req.file.filename
            };
            const productServiceObj = {
                image: image,
                name: data.name,
                price: data.price
            }
            startup.productsServices.push(productServiceObj);
        }
        startup.save();
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false, error: error });
    }
});

router.post('/delete-product-service', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session;
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        const startup = await Startup.findOne({ uid: user.uid });
        const productsServices = startup.productsServices;
        const newProductsServicesArray = productsServices.filter(function (obj) {
            return obj.fileName !== req.body.fileName;
        });
        startup.productsServices = newProductsServicesArray;
        startup.save();
        fs.unlinkSync('/startupUploads/' + req.file.filename);
        res.json({ data: true, productsServices: startup.productsServices });
    } catch (error) {
        console.log(error);
        res.json({ data: false, error: error });
    }
});

router.post('/delete-image', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session;
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        const startup = await Startup.findOne({ uid: user.uid });
        const images = startup.images;
        const newImagesArray = images.filter(function (obj) {
            return obj.fileName !== req.body.fileName;
        });
        startup.images = newImagesArray;
        // if (req.file) {
        //     const image = {
        //         data: fs.readFileSync((path.resolve('../client/public/startupUploads') + '/' + req.file.filename)),
        //         contentType: req.file.mimetype
        //     };
        //     const imageObj = {
        //         fileName: req.file.filename,
        //         image: image
        //     }
        //     startup.images.push(imageObj);
        // }
        startup.save();
        fs.unlinkSync(path.resolve('../client/public/startupUploads') + '/' + req.body.fileName);
        res.json({ data: true, images: startup.images });
    } catch (error) {
        console.log(error);
        res.json({ data: false, error: error });
    }
});

router.post('/add-image', upload.single('image'), async (req, res, next) => {
    try {
        const sessionCookie = req.cookies.session;
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        const startup = await Startup.findOne({ uid: user.uid });
        if (req.file) {
            const image = {
                fileName: req.file.filename,
                filePath: '/startupUploads/' + req.file.filename
            };
            const imageObj = {
                fileName: req.file.filename,
                image: image
            }
            startup.images.push(imageObj);
        }
        startup.save();
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false, error: error });
    }
});

router.post('/startup-setup', upload.single('image'), async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data);
        const edit = data.edit;
        const startup = await Startup.findOne({ email: data.user.email });
        startup.startupName = data.businessName;
        startup.slug = slugify(data.businessName, { lower: true });
        if (startup.logo) {
            fs.unlinkSync(startup.logo.filePath);
        }
        if (req.file) {
            startup.logo = {
                fileName: req.file.filename,
                filePath: '/startupUploads/' + req.file.filename
                // data: fs.readFileSync((path.resolve('../client/public/startupUploads') + '/' + req.file.filename)),
                // contentType: req.file.mimetype
            };
        }
        startup.description = data.businessDescription;
        startup.minPrice = data.minPrice;
        startup.maxPrice = data.maxPrice;
        startup.website = data.webUrl;
        startup.moneyClass = data.alignment;
        startup.activeDays = data.activeDays;
        startup.category = data.category;
        if (edit) {
            await Address.deleteOne({ id: startup.address._id });
        }
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
        startup.features = data.features;
        startup.save();
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false, error: error });
    }
});

module.exports = router;
