# Title

## Purpose

This article describes the key steps to build application with express, a light-weighted framework based on node. Inherited from node, it features real-time, high-performance, and scalable network.

## Concept

### init

* Install dependencies
  ```bash
  yarn add express pg dotenv axios bcrypt
  yarn add nodemon --save-dev
  ```
  * express: simplifies web development in Node.js by providing a framework for handling HTTP requests, defining routes, implementing middleware, and rendering dynamic views
  * pg: the package to connect to a PostgreSQL database
  * dotenv: allows you to load environment variables from a .env file
  * axios: a popular package for making HTTP requests, including GET and POST
  * bcrypt: a library for hashing and salting passwords
  * nodemon: a development utility that automatically restarts the server whenever changes are made to the code
  * cors: https://expressjs.com/en/resources/middleware/cors.html
* Initialize
  ```bash
  mkdir my-project
  cd my-project
  npm init -y
  ```
* `touch .gitignore` with
  ```bash
  # Dependency directories
  node_modules/
  
  # Optional npm cache directory
  .npm
  
  # dotenv environment variables file
  .env
  ```
* env: In `./.env`, we can add environment variables we want; for example, how to connect development database ...etc
  ```javascript
  process.env.xxx
  ```
* ES (import & export): [import and export]({{site.baseurl}}/javascript/2023/04/06/import-export.html)
* `touch app.js`
  ```javascript
  // init
  import express from 'express'
  const app = express();
  
  // parse body
  app.use(express.json());
  
  // passport
  import passport from './middleware/passport.js';
  app.use(passport.initialize());
  
  // cors
  import cors from 'cors'
  app.use(cors());
  
  // API
  import api from './apis/api_summary.js';
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
  
  export default app
  ```
* package.json
  ```JSON
  "scripts": {
    "test": "NODE_ENV=test jest",
    "dev": "NODE_ENV=development npx nodemon server.js",
    "debug": "npx nodemon --inspect-brk server.js"
  },
  ```
* server
  ```bash
  NODE_ENV=development npx nodemon server.js
  ```
* test it with curl: `curl http://localhost:5000/`

### Typescript

* `npx tsc --init`
* `yarn add ts-node`
* `yarn add tsconfig-paths`
* `yarn add express @types/express --save`
* `npx tsc`
* Update `package.json`
  ```JSON
  "scripts": {
    "start": "node dist/app.js",
    "dev": "NODE_ENV=development nodemon app.ts", // If you use nodemon for development
    "build": "tsc"
  }
  ```
* Allow ES, in `tsconfig.json`
  ```JSON
  {
    "compilerOptions": {
      "esModuleInterop": true,
    }
  }
  ```
* Update `nodemon.json`
  ```JSON
  {
    "watch": [
      "src"
    ],
    "ext": "ts",
    "execMap": {
      "ts": "node --loader ts-node/esm -r tsconfig-paths/register"
    },
    "ignore": [
      "src/**/*.spec.ts"
    ]
  }
  ```
* run app through `yarn run dev`

### structure

The structure I prefer

* node app
  * test
  * api
  * configs
  * models
  * database
    * migrations
  * middleware
  * services
    * sign in and sign up
  * server.js (core file to start the app)

#### Naming Convention

* File: use hyphens; for example, `user-controller.js`
* Url: use hyphens; for example, `/node-graph`

### API

[API]({{site.baseurl}}/node/2022/01/26/api.html)

### Database

Set up a database and models for a node project using PG and Sequelize. The process involves creating a database, installing Sequelize, configuring it using a .sequelizerc file and a config.js file, generating a migration file for the models, and migrating the database. For more information, please refer to [database]({{site.baseurl}}/node/2022/12/30/database.html).

### Model

Various libraries and frameworks such as Mongoose, Sequelize, or Bookshelf can be used to implement models in Node.js, providing an ORM layer for interacting with databases and managing data models. For more information, please refer to [model]({{site.baseurl}}/node/2022/01/20/model.html)

### Service

In Node.js, a service module can be a self-contained piece of code that performs a specific task or set of tasks, such as communicating with an external API, handling database interactions, or performing complex business logic. For more information, please refer to [service]()

### spec

I use jest.

* Install
  ```nash
  npm i jest
  ```
* In `/spec`, run jest
  * Setup script
    ```JSON
    "scripts": {
      "test": "NODE_ENV=test jest",
    },
    ```
* Create spec directory in root, and run tests in specific directory
  ```bash
  npx jest ./tests --detectOpenHandles
  ```
* Environment variables, in `.env` add following to setup test database
  ```bash
  TEST_DATABASE_URL={database_system}://{username}:{password}@{host_and_port}/{database_name}
  ```
* Refer to [Docker] for setting up test database; for example, PG
  ```bash
  docker run --name my_db \
      -e POSTGRESQL_PORT=5432 \
      -e POSTGRESQL_DB=my_db \
      -e POSTGRESQL_USER=postgres \
      -e POSTGRES_PASSWORD=test1234 \
      -d postgres
  ```
* Use `request(app)`
  ```javascript
  const request = require('supertest')
  const app = require('../server.js')
  const apis = require('../apis/summary.js')
  
  describe('HelloWorld', () => {
    let server
  
    beforeEach (() => {
      server = app.listen(0)
      apis(app)
    })
  
    afterEach(() => {
      server.close()
    })
  
    describe('GET /', () => {
      test('should return Hello World!', () => {
        request(app).get('/').then(response => {
          expect(response.text).toEqual('Hello World!')
        });
      })
    })
  })
  ```
* Other
  * Reset database before each case to drop and create tables
    ```javascript
    beforeEach(async () => {
      sequelize.truncate({ cascade: true, restartIdentity: true });
    });
    ```
* Mock: In `spec_config`
  ```javascript
  jest.mock('pg', () => { // should extract to other file
    const mPool = {
      connect: function () {
        return { query: jest.fn() };
      },
      query: jest.fn(),
      end: jest.fn(),
      on: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  ```

### debugger

#### project

In `package.json`,

```JSON
"scripts": {
  "debug": "NODE_ENV=test npx nodemon --inspect-brk server.js",
}
```

and run debug with

```bash
npm run debug
```

and in chrome, enter `chrome://inspect` and then click "inspect"

#### console

The better way is to use vscode.

open command palette with Command + Shift + P and then input

```bash
Debug: JavaScript Debug Terminal
```

In the terminal, input

```bash
npm test --watch # for jest
# or
node xxx.js # for plain script
```

Then we can debug the code in [debug console]

### File

* store
  ```javascript
  const fs = require('fs')
  
  // Sample JSON data
  const myData = {
    "name": "John",
    "age": 30,
    "city": "New York"
  }
  
  // Convert JSON data to a string
  const jsonString = JSON.stringify(myData)
  
  // Write the JSON data to a file
  fs.writeFile('myData.json', jsonString, function (err) {
    if (err) throw err
    console.log('Saved!')
  })
  ```
* read
  ```javascript
  const fs = require('fs');

  // Specify the file path
  const filePath = 'example.txt';
  
  // Asynchronously read the contents of the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Handle error if any
      console.error('Error reading file:', err);
      return;
    }
    
    // File contents are available in the `data` variable
    console.log('File contents:', data);
  });
  ```

### Auto Refresh

Use node-supervisor

* install
  ```bash
  npm install -g node-supervisor
  ```
* use
  ```bash
  node-supervisor -w /path/to/your/project server.js
  ```

#### Import and Export

Whether to use import or require() in Node.js project depends on the version of Node.js and personal preference for code style and syntax, with import being advantageous for newer versions of Node.js, while require() may be preferred for backwards compatibility and certain package compatibility.

## Reference

[How to organize routes in Nodejs Express app](https://stackoverflow.com/questions/59681974/how-to-organize-routes-in-nodejs-express-app)

[How to use .env file in node.js](https://dev.to/dallington256/how-to-use-env-file-in-nodejs-578h)

[Model Querying - Finders](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)

[jest debug](https://jestjs.io/docs/troubleshooting)

[Mocking a Database in Node with Jest](https://www.youtube.com/watch?v=IDjF6-s1hGk)

[Node.js v19.5.0 documentation](https://nodejs.org/api/http.html)

[npm Passport 筆記（Learn to Use Passport JS）](https://pjchender.dev/npm/npm-passport/)

[Password hashing in Node.js with bcrypt](https://blog.logrocket.com/password-hashing-node-js-bcrypt/)
