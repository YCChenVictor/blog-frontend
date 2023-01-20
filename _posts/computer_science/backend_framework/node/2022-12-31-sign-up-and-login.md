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

This article describes how to implement it with passport.

## Why?

Compare to not using it

Compare to not use passport

## How?

I will use passport for authentication. After sign up, the system will login this user automatically.

### init

install

```bash
npm i passport
npm i passport-local
npm i express-session
```

### config

add `./configs/config.js` with

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

In the code, you can see it will first find whether the user exist; if not, it will create a new user for you.

### APIs (signup, users, login)

```javascript
const passport = require('../configs/passport.js');
const User = require('../database/models/user.js');

module.exports = (app) => {
  app.post('/signup', (req, res, next) => { // create
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    
    User.findOne({ email }).then(user => {
      if (user) return res.status(400).json({ msg: 'User already exists' });
  
      const newUser = new User({
        email,
        password
      });
  
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              return passport.authenticate('local', {
                successRedirect: '/dashboard',
                failureRedirect: '/signup',
                failureFlash: true
              })(req, res, next);
            })
            .catch(err => console.log(err));
        });
      });
    });
  });

  // read, index
  app.get('/users', () => {
    modelUser.findAll().then(res => {
      console.log(res)
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });
  })
}
```

### spec

```javascript

```

#### login (TBC)

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
