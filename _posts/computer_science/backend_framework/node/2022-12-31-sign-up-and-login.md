---
layout: post
title:
description: ''
date: '2022-12-31'
categories: node
note: 似乎只有 login 需要用到 passport
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

This article describes how to implement it with passport.

## Why?

Compare to not using it

Compare to not use passport

## How?

I will use passport for authentication.

### init

install

```bash
npm i passport
npm i passport-local
npm i express-session
```

### sign up

#### API

```javascript
const passport = require('../services/passport.js');
const User = require('../database/models/user.js');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  app.post('/signup', async (req, res, next) => { // create
    const email = req.body.params.username
    const password = req.body.params.password
    if (!email || !password) {
      return res.status(401).json({ msg: 'Please enter all fields' });
    }

    const user = await User.create({
      email,
      password
    })

    const token = jwt.sign(user.email, 'secret_key');
    res.json({ token: token });
    res.end()
  })

  ...
}
```

#### spec

```javascript

```

### login (TBC)

#### service

You can think `passport.js` as a service to check whether this user can enter the border of our app.

* add `./service/passport.js` with (which can help use check whether it is legal for this user to check in)

```javascript
const User = require('../database/models/user.js');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

passport.use(new LocalStrategy({
    usernameField : 'email', // override username with email
    passwordField : 'password',
  }, (email, password, done) => {
    User.findOne({ email: email }).then(user => {
      if (!user) {
        return done(null, false, { message: 'That email is not registered' });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    })
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport
```

define routes

```javascript
module.exports = function(app) {
  ...
  app.post('/login', (req, res) => {
    const info = req.body;
    product.id = new Date().getTime();
    data.push(product);
    // 傳響應告訴前端已新增成功
    res.send({ success: true, data }).end();
    // console.log 看一下 data, 確認是否新增成功
    console.log(data);
  })
  ...
}
```

Create `login.js` with

```javascript
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
```

and

```javascript
app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
```

## What?

TBC

## Reference

[Node Authentication using passport.js - Part 1](https://dev.to/ganeshmani/node-authentication-using-passport-js-part-1-53k7)

[How do you debug Jest Tests?](https://stackoverflow.com/questions/33247602/how-do-you-debug-jest-tests)

[Username & Password](https://www.passportjs.org/concepts/authentication/password/)
