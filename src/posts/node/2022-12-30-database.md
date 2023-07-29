---
layout: post
title:
description: ''
date: '2022-12-30'
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

This article describes how to setup database and models for node project.

## Why?

We need stable way to create database schema for node app.

## How?

### PG

Please refer to [PG]({{site.baseurl}}/pg/2022/12/30/postgresql.html)

### migration

Migration in database is necessary to manage and track changes in the structure and content of a database, such as adding or modifying tables, columns, or data. It allows for a more organized and controlled approach to database development, deployment, and maintenance.

#### Install Sequelize

```bash
npm install --save sequelize
npm install -g sequelize-cli
```

#### configuration

(1) create `.sequelizerc` with

```javascript
const path = require('path')

module.exports = {
  config: path.resolve('./database/config', 'config.js'),
  'models-path': path.resolve('./database/models'),
  'seeders-path': path.resolve('./database/seeders'),
  'migrations-path': path.resolve('./database/migrations'),
}
```

(2) create sub-directories: `config`, `models`, `seeders` and `migrations` in `./database`

(3) in `config.js`

```javascript
require('dotenv').config()

module.exports = {
  development: {
      url: process.env.DEV_DATABASE_URL,
      dialect: 'postgres',
  },
  test: {
      url: process.env.TEST_DATABASE_URL,
      dialect: 'postgres',
  },
  production: {
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
  },
}
```

(4) In `.env`,

```bash
DEV_DATABASE_URL=postgres://postgres:test1234@127.0.0.1:5432/my_db
NODE_ENV=development
```

* remember to change `test1234`, `my_db` to what you desired

#### migration file

* create model
  ```bash
  sequelize model:generate --name user --attributes name:string,mail:string,password:string
  ```
  * and then you can setup constraints in migration file:
    ```javascript
    'use strict';
    /** @type {import('sequelize-cli').Migration} */
    module.exports = {
      async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
          ...
          email: {
            type: Sequelize.STRING,
            unique: true // add this line
          },
          ...
        });
      },
      async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
      }
    };
    ```
* Add column, for example, I want to add column, purpose to tasks table
  * In terminal, to create migration file
    ```bash
    npx sequelize-cli migration:generate --name add-purpose-to-tasks
    ```
  * A migration file created and input as follow
    ```bash
    module.exports = {
      up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('YourModelNameHere', 'purpose', {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        });
      },

      down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('YourModelNameHere', 'purpose');
      }
    };
    ```
  * run migration
    ```bash
    npx sequelize-cli db:migrate
    ```
  * Update model for column, purpose
    ```javascript
    'use strict';

    import Sequelize from 'sequelize';
    import sequelize from './index.js';

    const task = sequelize.define('task', {
      project: {
        type: Sequelize.STRING,
      },
      purpose: {
        type: Sequelize.STRING,
      },
      spec: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.FLOAT
      }
    })
    
    export default task
    ```
    

#### Must use import to load ES Module

creating a new package.json file in the migrations folder with

```JSON
{
  "type": "commonjs"
}
```

#### migrate

migrate with

```bash
sequelize db:migrate
```

or add script to migrate both test and development

```JSON
"scripts": {
  "database": "NODE_ENV=development sequelize db:migrate; NODE_ENV=test sequelize db:migrate"
}
```

#### rollback

```bash
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```

### schema

TBC

### match test database with development

## What?

### ChatGPT

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

## Reference

[DB-Migrate Simplified – How to Generate PosgreSQL Database From Node.js](https://www.kindsonthegenius.com/db-migrate-simplified-how-to-generate-posgresql-database-from-node-js/)

[透過 sequelize 來達成 DB Schema Migration](https://hackmd.io/@TSMI_E7ORNeP8YBbWm-lFA/ryCtaVW_M?print-pdf)

[Use Sequelize ORM with PostgreSQL in Your Express Project](https://blog.devgenius.io/use-sequelize-orm-with-postgresql-in-your-express-project-3c277b289522)

[How to easily create a Postgres database in Docker](https://dev.to/andre347/how-to-easily-create-a-postgres-database-in-docker-4moj)

[Resolving 'Must use import to load ES Module' error while using Sequelize ORM and ES6 syntax in Node.js"](https://dev.to/emekaofe/resolving-must-use-import-to-load-es-module-error-while-using-sequelize-orm-and-es6-syntax-in-nodejs-1o2c)
