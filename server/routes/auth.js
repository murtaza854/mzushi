const router = require('express').Router();
const firebaseFile = require('../firebase');
const firebase = firebaseFile.firebase;

router.post('/', async (req, res) => {
    try {
        var mode = req.body.mode;
        var actionCode = req.body.oobCode;
        var continueUrl = req.body.continueUrl || null;
        var lang = req.body.mode || 'en';
        let data;
        switch (mode) {
            case 'resetPassword':
                // Display reset password handler and UI.
                // handleResetPassword(auth, actionCode, continueUrl, lang);
                break;
            case 'recoverEmail':
                // Display email recovery handler and UI.
                // handleRecoverEmail(auth, actionCode, lang);
                break;
            case 'verifyEmail':
                // Display email verification handler and UI.
                // data = auth.handleVerifyEmail(firebase.auth(), actionCode, continueUrl, lang);
                await firebase.auth().applyActionCode(actionCode);
                res.json({ data: 'Email verified' });
                break;
            default:
                // Error: invalid mode.
                throw 'Invalid'
        }
    } catch (error) {
        res.json({ data: 'Invalid', error: error });
    }
});

module.exports = router;
