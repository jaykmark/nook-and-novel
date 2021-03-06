const bcrypt = require('bcryptjs');
const db = require('../models');

const error500 = () => {
  res.status(500).json({
    status: 500,
    error: [{ message: 'Something went wrong, please try again' }],
  });
};

// View User
const viewUser = (req, res) => {
  db.User.find({}, (err, allUser) => {
    if (err) return error500();
    res.json({
      status: 200,
      count: allUser.length,
      data: allUser,
      requestedAt: new Date().toLocaleString()
    })
  })
}


// POST Create User
const createUser = (req, res) => {
  db.User.findOne( { email: req.body.email }, (err, foundUser) => {
    if (err) return error500();

    if (foundUser) return res.status(400).json({
      status: 400,
      error: [{ message: 'Invalid request. Please try again.' }],
    });

    // Create Salt Rounds
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return error500();

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return error500();
      
        // Can change sign up form
        const newUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        };

        db.User.create(newUser, (err, createdUser) => {
          if (err) return error500();

          res.status(201).json({
            status: 201,
          });
        });
      });
    });
  });
};


// POST Login
const createSession = (req, res) => {
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return error500();

    if (!foundUser) return res.status(400).json({
      status: 400,
      error: [{ message: 'Username or password is incorrect.'},]
    });

    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return error500();

      if (isMatch) {
        req.session.currentUser = foundUser._id;
        return res.status(201).json({
          status: 201,
          data: { id: foundUser._id },
        });
      } else {
        return res.status(400).json({
          status: 400,
          error: [{ message: 'Username or password is incorrect.' }],
        });
      };
    });
  });
};

const verifyAuth = (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).json({
      status: 401,
      error: [{ message: 'Unauthorized. Please login and try again.' }],
    });
  }

  res.status(200).json({
    status: 200,
    user: req.session.currentUser,
  });
};


// GET Show Profile
const showProfile = (req, res) => {
  db.User.findById(req.params.userId, (err, foundProfile) => {
    if (err) return res.status(500).json({
      error: [{ message: 'Something went wrong. Please try again'}],
    });
    res.status(200).json({
      status: 200,
      data: foundProfile,
    })
  })
}


// DELETE Logout
const deleteSession = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({
      status: 500,
      errors: [{message: 'Something went wrong. Please try again'}]});

    res.status(200).json({
      status: 200,
      message: 'Success',
    });
  });
}

module.exports = {
  viewUser,
  createUser,
  createSession,
  verifyAuth,
  showProfile,
  deleteSession,
}