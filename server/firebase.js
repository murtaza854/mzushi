const { initializeApp } = require('firebase/app');
var admin = require("firebase-admin");
initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID
});

var serviceAccount = require("./mzushi-544aa-firebase-adminsdk-xxftd-24ca2e8293.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = {
  admin
}