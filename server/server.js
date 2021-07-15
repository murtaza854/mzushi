const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// const firebaseFile = require('./firebase');
// const firebase = firebaseFile.firebase;
// const firebaseAdmin = firebaseFile.admin;

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
    }));
    // app.use(express.static('../client/public'));

    const adminUserRoutes = require('./routes/adminUser');
    const productBrandRoutes = require('./routes/productBrand');
    const categoryRoutes = require('./routes/productCategory');
    const productCategoryRoutes = require('./routes/productCategory');
    const productSubCategoryRoutes = require('./routes/productSubCategory');
    // const productRoutes = require('./routes/product');
    const areaRoutes = require('./routes/area');
    const provinceRoutes = require('./routes/province');
    const cityRoutes = require('./routes/city');
    const countryRoutes = require('./routes/country');

    app.use('/api/admin-users', adminUserRoutes);
    app.use('/api/product-brand', productBrandRoutes);
    app.use('/api/category', categoryRoutes);
    app.use('/api/product-category', productCategoryRoutes);
    app.use('/api/product-sub-category', productSubCategoryRoutes);
    app.use('/api/area', areaRoutes);
    app.use('/api/province', provinceRoutes);
    app.use('/api/city', cityRoutes);
    app.use('/api/country', countryRoutes);
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
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}

createServer();


// app.use(bodyParser.json());
// app.use(cookieParser());

// app.get('/signup', (req, res) => {
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword('murtazashafi11@gmail.com', 'test123')
//     .then(({ user }) => {
//       user.sendEmailVerification();
//       res.send(user);
//     })
//   // .then(() => {
//   // return firebase.auth().signOut();
//   // }) app passswor d = 
//   // res.send('Hello World!');
// })

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

// app.get('/', (req, res) => {
//   res.send(firebase.auth())
//   // admin
//   // .auth()
//   // .deleteUser('tbgzyIvZadUx0O3O68U8IFWNPen1')
//   // .then((userRecord) => {
//   //   // See the UserRecord reference doc for the contents of userRecord.
//   //   console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//   //   res.send('Successfully deleted user')
//   // })
//   // .catch((error) => {
//   //   console.log('Error deleting user:', error);
//   //   res.send('Error deleting user:', error)
//   // });

//   // admin
//   // .auth()
//   // .getUser('tbgzyIvZadUx0O3O68U8IFWNPen1')
//   // .then((userRecord) => {
//   //   // See the UserRecord reference doc for the contents of userRecord.
//   //   console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//   // })
//   // .catch((error) => {
//   //   console.log('Error fetching user data:', error);
//   // });

//   // firebase.auth()
//   // .getUser('tbgzyIvZadUx0O3O68U8IFWNPen1')
//   // .then((userRecord) => {
//   //   // See the UserRecord reference doc for the contents of userRecord.
//   //   res.send(`Successfully fetched user data: ${userRecord.toJSON()}`);
//   // })
//   // .catch((error) => {
//   //   res.send('Error fetching user data:', error);
//   // });  
// })


// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });