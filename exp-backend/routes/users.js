var express = require('express');
var router = express.Router();
var models = require('../models')
var authService = require('../services/auth');

// ROUTE - user signup (POST)
// Needs to get user info from the request
router.post('/signup', async function (req, res, next) {
  // verifying if information was recieved with the request
  console.log(req.body);

  const [user, created] = await models.users.findOrCreate({
    // Adding 'username' and 'email' to where clause to ensure unique 
    where: {
      username: req.body.username,
      email: req.body.email
    },
    defaults: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      // hashing password before sending to database
      password: authService.hashPassword(req.body.password)
    }
  })

  // If user was created
  if (created) {
    res.json({
      message: "User Created",
      status: 200
    })
  }
  // If user was not created(unique constraint from username and email)
  else {
    res.json({
      message: "Cannot create user, check username and email",
      status: 400
    })
  }
});


// ROUTE - user signin (POST)
// Needs to get username and password from the request
router.post('/signin', async function (req, res) {
  // verifying if information was recieved with the request
  console.log(req.body);

  // Finding a match for the username
  let user = await models.users.findOne({
    where: {
      username: req.body.username
    }
  });

  // If match was found for the username
  if (user) {
    let passwordMatch = authService.comparePasswords(req.body.password, user.password);
    // If passwords match
    if (passwordMatch) {
      let token = authService.signUser(user);

      // Sending token as part of the response
      res.json({
        message: "Logged In successfully",
        status: 200,
        jwt: token
      })
    }

    // If passwords do not match
    else {
      res.json({
        message: "Incorrect Password",
        status: 400
      })
    }
  }

  // If no users matched the provided username
  else {
    res.json({
      message: "Username doesn't exist",
      status: 400
    })
  }
})

// ROUTE - user profile (GET)
// Expecting token as part of 'Authorization' header with 'Bearer '
router.get('/profile', async function (req, res) {
  // Using helper function to extract token from headers
  let token = getToken(req);

  // If a token was received
  if (token) {

    // Using service function to verify token
    let user = await authService.verifyUser(token);
    // If the token was successfully verified
    if (user) {
      res.json({
        message: "Profile Retrieved Successfully",
        status: 200,
        user: user
      })
    }
    // If the token was invalid or expired
    else {
      res.json({
        message: "Token has expired or was invalid",
        status: 400
      })
    }
  }

  // If a token was not received
  else {
    res.json({
      message: "No Token Found",
      status: 401
    })
  }
})

// Function to extract token from given request
function getToken(req) {
  console.log("function for getting token called")
  // header names are converted to lowercase
  let token = req.headers['authorization'];

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Removing the 'Bearer ' portion from the token
      token = token.slice(7, token.length)
    }
  }

  return (token) ? token : null;
}
module.exports = router;
