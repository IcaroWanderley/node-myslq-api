const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');

const v = new Validator();

function signUp(req, res) {
  const schema = {
    name: { type: "string", optional: false, max: "40" },
    email: { type: "email", optional: false },
    password: { type: "string", optional: false, min: "6" }
  };

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  const validationResponse = v.validate(user, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse
    });
  }

  models.User.findOne({ where: { email: req.body.email } }).then(result => {
    if (result) {
      res.status(409).json({
        message: "Email already exists"
      });
    } else {
      bcryptjs.genSalt(10, function (err, salt) {
        bcryptjs.hash(req.body.password, salt, function (err, hash) {
          const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hash
          };

          models.User.create(newUser).then(result => {
            res.status(201).json({
              message: "User created successfully",
              user: result
            });
          }).catch(error => {
            res.status(500).json({
              message: "Something went wrong",
              error: error
            });
          });
        });
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Something went wrong",
      error: error
    });
  });
}

function login(req, res) {
  const schema = {
    email: { type: "email", optional: false },
    password: { type: "string", optional: false, min: "6" }
  };

  const credentials = {
    email: req.body.email,
    password: req.body.password
  };

  const validationResponse = v.validate(credentials, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse
    });
  }

  models.User.findOne({ where: { email: req.body.email } }).then(user => {
    if (user === null) {
      return res.status(401).json({
        message: "Invalid credentials!"
      });
    } else {
      bcryptjs.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          const tokenPayload = {
            email: user.email,
            userId: user.id
          };
          const jwtKey = process.env.JWT_KEY || 'secret';

          jwt.sign(tokenPayload, jwtKey, function (err, token) {
            if (err) {
              return res.status(500).json({
                message: "Token generation failed",
                error: err
              });
            }
            res.status(200).json({
              message: "Authentication successful",
              token: token
            });
          });
        } else {
          res.status(401).json({
            message: "Invalid credentials!"
          });
        }
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Something went wrong",
      error: error
    });
  });
}

module.exports = {
  signUp: signUp,
  login: login
};