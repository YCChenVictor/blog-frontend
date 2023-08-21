---
layout: post
title:
description: ''
date: '2022-12-31'
categories: node
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

This article provides a step-by-step guide on implementing sign up and log in functionality in your Node.js application using express-session for session management and passport for login authentication. It covers the usage of middleware for authentication, supports multiple authentication strategies including Local Authentication, OAuth (e.g., Facebook, Google), and OpenID Connect, and demonstrates how to enhance security by utilizing bcrypt to encode and store passwords securely in the database, ensuring protection against potential attackers.

## Why?

Validate whether this user can use our product

## How?

### Database

Refer to [database]

### Server

```javascript
...
// session: used to manage and maintain session data, providing a way to store and retrieve user-specific information across multiple requests.
const session = require('express-session');
app.use(session({
  secret: 'any secret',
  resave: true,
  saveUninitialized: true,
}));

// passport: used in Node.js applications with the 'passport' middleware to handle user authentication using username and password credentials stored locally.
const passport = require('./middleware/passport.js');
app.use(passport.initialize());
...
module.exports = app
```

### User Model

Given we setup the [model](2022-01-20-model) environment, create a file `models/user.js` with

```javascript
'use strict';

const Sequelize = require('sequelize');
const sequelize = require('./index.js');

const user = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING
  }
})

module.export = user
```

### Passport Middleware

You can think `passport.js` as a middleware to check whether this user can enter the border of our app.

* add `./middleware/passport.js`

```javascript
const User = require('../database/models/user.js');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');

const customizedPassport = passport.use(
  new LocalStrategy({ // here can be changed to JWT strategy
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, async (username, password, done) => {
    user = await User.findOne({
      username,
      password
    })

    if (!user) {
      return done(null, false, { message: 'no user' });
    } else {
      const token = jwt.sign(user.email, 'secret_key');
      return done(null, {token: token});
    }
  })
);

customizedPassport.serializeUser(function(user, done) {
  done(null, user);
});

customizedPassport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = customizedPassport
```

#### JWT

```javascript
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key'
};

const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  // You can perform user lookup based on jwtPayload.sub or any other criteria
  // For example:
  // User.findById(jwtPayload.sub)
  //   .then(user => {
  //     if (user) {
  //       return done(null, user);
  //     } else {
  //       return done(null, false);
  //     }
  //   })
  //   .catch(err => done(err, false));

  // For simplicity, let's assume user always exists
  return done(null, { id: jwtPayload.sub });
});

passport.use(jwtStrategy);

// To protect routes, use passport.authenticate('jwt', { session: false })

// Example route:
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'You are authorized to access this route!' });
});
```

#### dynamic strategy

```javascript
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Define your strategies
const localStrategy = new LocalStrategy((username, password, done) => {
  // Your local authentication logic here
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key'
};

const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  // Your JWT authentication logic here
});

// Use the strategies in Passport
passport.use(localStrategy);
passport.use(jwtStrategy);

// Middleware to dynamically choose strategy based on request
const chooseStrategy = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    passport.authenticate('jwt', { session: false })(req, res, next);
  } else {
    passport.authenticate('local', { session: false })(req, res, next);
  }
};

// Use the middleware in your routes
app.post('/login', chooseStrategy, (req, res) => {
  // If the chosen strategy succeeds, this route will be accessed.
  res.json({ message: 'Authentication successful!' });
});
```

### API

* user story
  * signup
    * frontend post email and password
    * backend encode password with bcrypt and store email and encoded password in database
    * return jwt token
  * login
    * frontend post email and password
    * backend find user with email
    * backend decode password
    * return jwt token
* code example
  ```javascript
  import passport from '../middleware/passport.js'
  import User from '../database/models/user.js'
  import jwt from 'jsonwebtoken'
  
  const userAPIs = (app) => {
    app.post('/signup', async (req, res, next) => {
      const { email, password } = req.body.params; // Destructure email and password from req.body.params
  
      if (!email || !password) {
        return res.status(401).json({ msg: 'Please enter all fields' });
      }
  
      try {
        const user = await User.create({
          email,
          password
        });
  
        const token = jwt.sign({ email: user.email }, 'secret_key'); // Wrap the payload in an object
        res.json({ token });
      } catch (error) {
        // Handle error during user creation
        console.error(error);
        res.status(500).json({ msg: 'An error occurred' });
      }
    });
  
    app.post('/login', passport.authenticate('local'), (req, res) => {
      res.status(200).json({ token: req.user.token });
    });
  };
  
  export default userAPIs
  ```
* QA
  ```bash
  curl -d '{"key": "item"}' -H "Content-Type: application/json" -X POST https://any_existed_url.com/
  ```

### spec

TBC

```javascript

```

### session vs token

I just choose JWT (token) for my apps (Of course, we can use both). Both sessions and JWTs (JSON Web Tokens) are commonly used for user authentication and authorization.

Session: server-side authentication -> server creates unique session ID -> store on server -> send it to client as cookie -> client send session ID in each request -> match for authentication

JWT: stateless authentication -> server generates token containing the user's identity -> send to client as a response to a successful login request -> client includes the token in header of requests -> server authenticate and authorize

## What?

give a project and use postman to demo

## Reference

[Node Authentication using passport.js - Part 1](https://dev.to/ganeshmani/node-authentication-using-passport-js-part-1-53k7)

[How do you debug Jest Tests?](https://stackoverflow.com/questions/33247602/how-do-you-debug-jest-tests)

[Username & Password](https://www.passportjs.org/concepts/authentication/password/)

[Easy Way to Debug Passport Authentication in Express](https://dmitryrogozhny.com/blog/easy-way-to-debug-passport-authentication-in-express)

[[npm] Passport 筆記（Learn to Use Passport JS）](https://pjchender.dev/npm/npm-passport/)

[Session vs Token Authentication in 100 Seconds](https://www.youtube.com/watch?v=UBUNrFtufWo)
