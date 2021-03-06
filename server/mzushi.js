const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const app = express();


const Startup = require('./schema').startup;

const firebaseFile = require('./firebase');
// const firebase = firebaseFile.firebase;
const firebaseAdmin = firebaseFile.admin;

const url = process.env.DATABASE_URL;
const port = process.env.PORT;

const createServer = async (callback) => {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("Database created!");

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(cookieParser(
        process.env.COOKIE_SECRET
    ));
    app.use(cors({
        credentials: true,
        origin: [process.env.API_URL1, process.env.API_URL2]
        // origin: [process.env.API_URL3]
        // origin: '*'
    }));
    app.use(express.static('./build'));

    const adminUserRoutes = require('./routes/adminUser');
    const productBrandRoutes = require('./routes/productBrand');
    const categoryRoutes = require('./routes/category');
    const productCategoryRoutes = require('./routes/productCategory');
    const productSubCategoryRoutes = require('./routes/productSubCategory');
    // const productRoutes = require('./routes/product');
    const areaRoutes = require('./routes/area');
    const provinceRoutes = require('./routes/province');
    const cityRoutes = require('./routes/city');
    const countryRoutes = require('./routes/country');
    const authRoutes = require('./routes/auth');
    const adPackageRoutes = require('./routes/adPackage');
    const startupRoutes = require('./routes/startup');
    const featuresRoutes = require('./routes/features');

    app.use('/api/admin-user', adminUserRoutes);
    app.use('/api/product-brand', productBrandRoutes);
    app.use('/api/category', categoryRoutes);
    app.use('/api/product-category', productCategoryRoutes);
    app.use('/api/product-sub-category', productSubCategoryRoutes);
    app.use('/api/area', areaRoutes);
    app.use('/api/province', provinceRoutes);
    app.use('/api/city', cityRoutes);
    app.use('/api/country', countryRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/ad-package', adPackageRoutes);
    app.use('/api/startup', startupRoutes);
    app.use('/api/feature', featuresRoutes);

    app.get('/api/logged-in', async (req, res) => {
        try {
            const sessionCookie = req.cookies.session || "";
            if (sessionCookie) {
                const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
                if (user) {
                    const displayName = user.name;
                    const email = user.email;
                    const emailVerified = user.emailVerified || user.email_verified;
                    const admin = user.admin;
                    let accountSetup = true;
                    let provider = '';
                    if (!admin) {
                        const startup = await Startup.findOne({ uid: user.uid });
                        accountSetup = startup.accountSetup;
                        provider = startup.provider;
                    }
                    else {
                        accountSetup = true;
                    }
                    if (!emailVerified && provider !== 'facebook') {
                        res.clearCookie("session");
                        res.json({ data: { displayName, email, emailVerified, accountSetup, admin, provider } });
                    } else {
                        res.json({ data: { displayName, email, emailVerified, accountSetup, admin, provider } });
                    }
                } else res.json({ data: null })
            } else {
                res.json({ data: null });
            }
        } catch (error) {
            res.json({ data: null, error: error });
        }
    });
    // app.get('*', function (req, res) {
    //     // res.sendFile('./build/index.html');
    //     res.sendFile(path.resolve('./build/index.html'));
    // });
    // app.use('/api/orders', orderRoutes);
    // app.get('/login', (req, res) => {
    //   firebase.auth().signInWithEmailAndPassword('murtazashafi11@gmail.com', 'test123')
    //   .then((userCredential) => {
    //     // Signed in
    //     var user = userCredential.user;
    //     res.send(user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     // var errorCode = error.code;
    //     // var errorMessage = error.message;
    //     res.send(error);
    //   });
    // })
    // app.get('/__/auth/action', async (req, res) => {
    //     try {
    //         var mode = req.query.mode;
    //         var actionCode = req.query.oobCode;
    //         var continueUrl = req.query.continueUrl || null;
    //         var lang = req.query.mode || 'en';
    //         let data;
    //         switch (mode) {
    //             case 'resetPassword':
    //                 // Display reset password handler and UI.
    //                 // handleResetPassword(auth, actionCode, continueUrl, lang);
    //                 break;
    //             case 'recoverEmail':
    //                 // Display email recovery handler and UI.
    //                 // handleRecoverEmail(auth, actionCode, lang);
    //                 break;
    //             case 'verifyEmail':
    //                 // Display email verification handler and UI.
    //                 // data = auth.handleVerifyEmail(firebase.auth(), actionCode, continueUrl, lang);
    //                 await auth.applyActionCode(actionCode);
    //                 res.json({ data: true });
    //                 break;
    //             default:
    //                 // Error: invalid mode.
    //                 throw 'Invalid'
    //         }
    //     } catch (error) {
    //         res.json({ data: 'Invalid', error: error });
    //     }
    // });
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}

createServer();