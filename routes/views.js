const express = require('express');
const router = express.Router();
const ctlr = require('../controllers');

// ------------------------------- AUTH ---------------------------- //

// GET Home
router.get('/', (req, res) => {
  res.sendFile('views/index.html', {
    root: `${__dirname}/../`
  });
});

// GET Signup
router.get('/signup', (req, res) => {
  res.sendFile('views/auth/signup.html', {
    root: __dirname,
  });
});


// GET Login
router.get('/login', (req, res) => {
  res.sendFile('views/auth/login.html', {
    root: `${__dirname}/../`
  });
});


// ------------------------------- Profile ---------------------------- //

// GET User Profile
// router.get('/profile/:userId', (req, res) => {
//   if (!req.session.currentUser) {
//     return res.redirect('/login');
//   }

//   res.sendFile('views/profile/show.html', {
//     root: `${__dirname}/../`
//   });
// });


// ------------------------------- Book list ---------------------------- //

// GET Book list
router.get('/booklist', (req, res) => {
    res.sendFile('views/booklist.html', {
      root: `${__dirname}/../`
    });
  });
  

module.exports = router;
