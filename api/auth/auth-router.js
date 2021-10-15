const Users = require("./../users/users-model");
const {
  checkUsernameExists,
  validateUsername,
  validatePassword,
  hashThePW,
  usernameValidForLogin,
  checkPasswordCorrect,
} = require("./../middleware/auth-middleware");
const router = require("express").Router();

router.post(
  "/register",
  validatePassword,
  validateUsername,
  hashThePW,
  (req, res, next) => {
    Users.add(req.body)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch(next);
  }
);

router.post(
  "/login",
  usernameValidForLogin,
  validatePassword,
  checkUsernameExists,
  checkPasswordCorrect,
  (req, res, next) => {
    try {
      res.status(200).json({
        message: `welcome, ${req.body.username}`,
        token: req.token,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
