# Title

## Why?

We need a common sense

## How?

### Basic Structure

* Params
  ```javascript
  const express = require('express');
  const app = express();
  const port = 3000; // Change this to the desired port number
  
  // Define a route with a parameter
  app.get('/api/:paramName', (req, res) => {
    const paramName = req.params.paramName;
    res.send(`Received parameter: ${paramName}`);
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  ```

### file structure

* Create a directory, `api/` with API going to be imported in `app.js`
* For example, `api/summary.js`
  ```javascript
  function apis(app) {
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
  }
  
  export default apis;
  ```
* Use it. In `app.js`,
  ```javascript
  import api from './apis/summary.js';
  api(app);
  ```

#### REST

Given [pre-knowledge]({{site.baseurl}}/api/2021/02/18/overview.html), we can compose RESTful them as follow:

```javascript
// restful API
// GET /records -> records#index
// POST /records -> records#create
// GET /records/new -> records#new
// GET /records/:id/edit -> records#edit
// GET /records/:id -> records#show
// PATCH /records/:id -> records#update
// PUT /records/:id -> records#update
// DELETE /records/:id -> records#destroy

const modelRecord = require('../database/models/record.js')

module.exports = (app) => {
  // TODO: add RESTful api for record here
}
```

#### internal consume

Just call them with proper endpoint

```javascript
request({
  url: 'http://127.0.0.1:3000/api/', //on 3000 put your port no.
  method: 'POST',
  json: {
    obj: Obj
  }
  }, function (error, response, body) {
    console.log({error: error, response: response, body: body});
});
```

### external API

A real quick example:

```javascript
const axios = require('axios');

const data = {
  param1: 'value1',
  param2: 'value2'
};

axios.post('https://api.example.com/path', data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
```

#### Youtube

* Purpose: I want to manage my account’s subscription in a mathematical way
* Repo: https://github.com/googleapis/google-api-ruby-client
* Documentation: https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps#node.js
* Quota (refresh every day): https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas
* Steps
  * Install required package: `npm install googleapis`
  * Get the Key
    * Start a project in [console.cloud](https://console.cloud.google.com/apis/library/youtube.googleapis.com?project=mineral-balm-313306)
    * Get the key in [Service Detail](https://console.cloud.google.com/apis/api/youtube.googleapis.com/credentials?project=mineral-balm-313306)
    * Put it in `dotenv` 
  * Init `youtube`
    ```javascript
    const { google } = require("googleapis");
    const youtube = google.youtube({
      version: "v3",
      auth: apiKey,
    });
    ```
  * Use API
    ```javascript
    app.get("/search-with-googleapis", async (req, res, next) => {
      try {
        const searchQuery = req.query.search_query;
        const response = await youtube.search.list({
          part: "snippet",
          q: searchQuery,
        });

        const titles = response.data.items.map((item) => item.snippet.title);
        res.send(titles);
      } catch (err) {
        next(err);
      }
    });
    ```
    * Test it with: `curl http://localhost:5000/search-youtube-with-googleapis`

#### ChatGPT

* Sign up for an OpenAI account
* Create an API key in OpenAI account dashboard. This key will be used to authenticate requests to the API
* Install the openai package
  ```bash
  npm install openai
  ```
* connect
  ```javascript
  const openai = require('openai');
  
  // Set up the OpenAI API credentials
  openai.apiKey = 'YOUR_API_KEY';
  
  // Set up the request parameters
  const prompt = 'Hello, ChatGPT!';
  const model = 'text-davinci-002';
  const temperature = 0.5;
  const maxTokens = 100;
  
  // Send the request to ChatGPT
  openai.complete({
    engine: model,
    prompt: prompt,
    temperature: temperature,
    maxTokens: maxTokens,
  }).then(response => {
    console.log(response.data.choices[0].text);
  }).catch(error => {
    console.log(error);
  });
  ```

### inherit

In Express, you can create a base API router and then have other routers inherit from it. This can help you organize your routes and middleware effectively. Here's how you can achieve this:

1. Create a Base API Router:

```javascript
// baseRouter.js
const express = require('express');

const baseRouter = express.Router();

// Add middleware or routes specific to the base API here
baseRouter.use((req, res, next) => {
  // Add any base API middleware logic here
  next();
});

module.exports = baseRouter;
```

2. Create Specific Routers Inheriting from the Base Router:

```javascript
// userRouter.js
const express = require('express');
const baseRouter = require('./baseRouter'); // Import the base router

const userRouter = express.Router();

// Add middleware or routes specific to user API here
userRouter.use((req, res, next) => {
  // Add any user-specific middleware logic here
  next();
});

// Use the baseRouter middleware in userRouter
userRouter.use(baseRouter);

// Add user-specific routes here
userRouter.get('/profile', (req, res) => {
  // User profile route logic
});

module.exports = userRouter;
```

3. Use the Routers in Your Main Application File:

```javascript
// app.js
const express = require('express');
const userRouter = require('./userRouter'); // Import the user router

const app = express();

// Use the userRouter middleware in the main app
app.use('/api/user', userRouter);

// Other app-level configurations and routes can be added here

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, the `userRouter` inherits from the `baseRouter`. You can create additional routers following the same pattern, each inheriting from the `baseRouter` or other relevant routers. This approach helps you keep your code modular and organized.

## What?

### user

```javascript
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import passport from '../middleware/passport.js';

const userAPIs = (app) => {
  app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Create a new user using the User model
      const newUser = await User.create({ username, password });
  
      res.json({ message: 'Signup successful', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login-failure' }),
    (req, res) => {
      res.json({ message: 'Login successful', user: req.user });
    }
  );

  app.get('/authentication', passport.authenticate('jwt'), (req, res) => {
    res.status(200).json({ loggedIn: true });
  });
};
```

## Reference
