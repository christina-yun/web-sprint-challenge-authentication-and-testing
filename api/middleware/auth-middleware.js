const bcrypt = require("bcryptjs");
const { tokenBuilder } = require("./../auth/tokenbuilder");
const Users = require("./../users/users-model");

const checkUsernameExists = async (req, res, next) => {
  const validUsername = await Users.findBy({ username: req.body.username });

  if (!validUsername) {
    next({
      status: 401,
      message: "invalid credentials",
    });
  } else {
    next();
  }
};

const validateUsername = async (req, res, next) => {
  const username = req.body.username;

  if (!username || username.trim().length < 1) {
    next({ status: 401, message: "username and password required" });
  } else {
    const duplicateUsername = await Users.findBy({ username: username });

    if (duplicateUsername) {
      next({
        status: 422,
        message: "username taken",
      });
    } else {
      const trimmedName = username.trim().toLowerCase();
      req.body.username = trimmedName;
      next();
    }
  }
};

const validatePassword = (req, res, next) => {
  const password = req.body.password;

  if (!password) {
    next({ status: 401, message: "username and password required" });
  } else {
    next();
  }
};

const hashThePW = (req, res, next) => {
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(req.body.password, rounds);

  req.body.password = hash;
  next();
};

const usernameValidForLogin = (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    next({ status: 401, message: "username and password required" });
  } else {
    next();
  }
};

const checkPasswordCorrect = async (req, res, next) => {
  let { username, password } = req.body;
  const validUser = await Users.findBy({ username: username });

  if (validUser && bcrypt.compareSync(password, validUser.password)) {
    const token = tokenBuilder(validUser);
    req.token = token;
    next();
  } else {
    next({ status: 401, message: "invalid credentials" });
  }
};

module.exports = {
  checkUsernameExists,
  validateUsername,
  validatePassword,
  hashThePW,
  usernameValidForLogin,
  checkPasswordCorrect,
};
