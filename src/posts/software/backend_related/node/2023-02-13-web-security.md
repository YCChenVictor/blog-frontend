---
layout: post
title:
description: ''
date: '2023-02-13'
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

This article describes how node deal with web security.

## Why?

Please refer to [here]({{site.baseurl}}/web-security/2022/08/30/overview.html) to see why we need to deal with web security.

## How?

### CORS

We can add CORS middleware in node

```javascript
// init
const express = require('express')
const app = express()

...

// cors
const cors = require('./middleware/cors.js');
app.use(cors);

// API
const api = require('./apis/api_summary.js');
if (process.env.NODE_ENV === 'development') {
  app.listen(5000, () => {
    api(app)
  })
} else if (process.env.NODE_ENV === 'test') {
  app.listen(8080, () => {
    api(app)
  })
} else {
  // TODO for production
}

module.exports = app
```

and the middleware

```javascript
cors = (req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
}

module.exports = cors
```

* we define resources of node can only be requested by localhost:3000
* remember to add headers of fields in `Access-Control-Allow-Headers`

## What?

to be continued

## Reference
