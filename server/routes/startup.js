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

router.get('/get-logged-in', async (req, res) => {
    try {
        const user = firebase.auth().currentUser;
        if (user) {
            const idTokenResult = await user.getIdTokenResult();
            const admin = idTokenResult.claims.admin;
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
        const startups = await Startup.find({ mzushiChoice: false, address: addresses }).populate("category");
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
        await firebase.auth().signOut();
        res.json({ loggedIn: false });
    } catch (error) {
        res.json({ loggedIn: false, error: error });
    }
});

router.post('/change-password', async (req, res) => {
    try {
        const user = firebase.auth().currentUser;
        const email = user.email;
        const credential = firebase.auth.EmailAuthProvider.credential(
            email,
            req.body.oldPassword
        );
        await user.reauthenticateWithCredential(credential);
        await user.updatePassword(req.body.password);
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false });
    }
});

router.post('/change-email', async (req, res) => {
    try {
        const user = firebase.auth().currentUser;
        const email = user.email;
        const newEmail = req.body.email;
        const credential = firebase.auth.EmailAuthProvider.credential(
            email,
            req.body.password
        );
        await user.reauthenticateWithCredential(credential);
        const dbUser = await Startup.findOne({ uid: user.uid });
        if (email !== newEmail) {
            await user.updateEmail(newEmail);
            user.sendEmailVerification();
            dbUser.email = newEmail;
            dbUser.save();
        }
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false });
    }
});

router.post('/change-owner-info', async (req, res) => {
    try {
        const user = firebase.auth().currentUser;
        const dbUser = await Startup.findOne({ uid: user.uid });
        await user.updateProfile({
            displayName: req.body.firstName
        })
        dbUser.ownerFirstName = req.body.firstName;
        dbUser.ownerLastName = req.body.lastName;
        dbUser.contactNumber = req.body.contactNumber;
        dbUser.save();
        const idTokenResult = await user.getIdTokenResult();
        const admin = idTokenResult.claims.admin;
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const accountSetup = dbUser.accountSetup;
        res.json({ data: { displayName, email, emailVerified, accountSetup, admin }, check: true });
    } catch (error) {
        console.log(error);
        res.json({ check: false });
    }
});

router.post('/send-password-reset-link', async (req, res) => {
    try {
        await firebase.auth().sendPasswordResetEmail(req.body.email);
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: false });
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

router.post('/add-product-service', upload.single('image'), async (req, res, next) => {
    try {
        const user = firebase.auth().currentUser;
        const startup = await Startup.findOne({ uid: user.uid });
        const data = JSON.parse(req.body.data);
        if (req.file) {
            const image = {
                data: fs.readFileSync((path.resolve('../client/public/startupUploads') + '/' + req.file.filename)),
                contentType: req.file.mimetype
            };
            const productServiceObj = {
                fileName: req.file.filename,
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
        const user = firebase.auth().currentUser;
        const startup = await Startup.findOne({ uid: user.uid });
        const productsServices = startup.productsServices;
        const newProductsServicesArray = productsServices.filter(function (obj) {
            return obj.fileName !== req.body.fileName;
        });
        console.log(req.body.fileName)
        startup.productsServices = newProductsServicesArray;
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
        res.json({ data: true, productsServices: startup.productsServices });
    } catch (error) {
        console.log(error);
        res.json({ data: false, error: error });
    }
});

router.post('/delete-image', async (req, res) => {
    try {
        const user = firebase.auth().currentUser;
        const startup = await Startup.findOne({ uid: user.uid });
        const images = startup.images;
        const newImagesArray = images.filter(function (obj) {
            return obj.fileName !== req.body.fileName;
        });
        console.log(req.body.fileName)
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
        const user = firebase.auth().currentUser;
        const startup = await Startup.findOne({ uid: user.uid });
        if (req.file) {
            const image = {
                data: fs.readFileSync((path.resolve('../client/public/startupUploads') + '/' + req.file.filename)),
                contentType: req.file.mimetype
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
        console.log(req.file.filename);
        const startup = await Startup.findOne({ email: data.user.email });
        startup.startupName = data.businessName;
        startup.slug = slugify(data.businessName, { lower: true });
        if (req.file) {
            startup.logo = {
                data: fs.readFileSync((path.resolve('../client/public/startupUploads') + '/' + req.file.filename)),
                contentType: req.file.mimetype
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
