const express = require('express');
const router = express.Router();
const ctlr = require('../controllers');


// ----------------------------- AUTH -------------------------- //
router.get('/signup', ctlr.auth.viewUser);
router.post('/signup', ctlr.auth.createUser);
router.post('/login', ctlr.auth.createSession);
// router.delete('/logout', ctlr.auth.deleteSession);
router.get('/verify', ctlr.auth.verifyAuth);


// ----------------------------- PROFILE -------------------------- //

router.get('/profile/:userId', ctlr.auth.showProfile);


// ----------------------------- BOOK LIST -------------------------- //
// router.get('/booklist', ctlr.auth.showProfile);


module.exports = router;
