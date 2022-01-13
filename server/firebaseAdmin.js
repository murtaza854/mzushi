const {
    initializeApp,
    // getApp,
    cert
} = require('firebase-admin/app');
const {
    getAuth,
} = require('firebase-admin/auth');

const serviceAccount = require("./mzushi-key.json");

initializeApp({
    credential: cert(serviceAccount),
});
// const admin = getApp();
const adminAuth = getAuth();

// const admin = getApp();
// console.log(admin);

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

module.exports = {
    adminAuth,
}
