const Users = require('./../users/users-model');
const { checkUsernameExists, validateUsername, validatePassword, hashThePW, usernameValidForLogin, checkPasswordCorrect } = require('./../middleware/auth-middleware');
const router = require('express').Router();

router.post('/register', validatePassword, validateUsername,  hashThePW, (req, res, next) => {
  Users.add(req.body)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.post('/login', usernameValidForLogin, validatePassword, checkUsernameExists, checkPasswordCorrect, (req, res, next) => {
  try{
    res.status(200).json({
      message: `welcome, ${req.body.username}`,
      token: req.token
    })
  }
  catch(err){
    next(err);
  }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
