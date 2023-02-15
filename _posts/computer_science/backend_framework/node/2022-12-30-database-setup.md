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

### migration

#### install

use `sequelize`

(1) create database with pg command

(2) install `sequelize`

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

generate

```bash
sequelize model:generate --name user --attributes name:string,mail:string,password:string
```

and then you can setup constraints in migration file:

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

* [types](https://sequelize.org/docs/v7/other-topics/other-data-types/)

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

to be continued

## What?

TBC

## Reference

[DB-Migrate Simplified – How to Generate PosgreSQL Database From Node.js](https://www.kindsonthegenius.com/db-migrate-simplified-how-to-generate-posgresql-database-from-node-js/)

[透過 sequelize 來達成 DB Schema Migration](https://hackmd.io/@TSMI_E7ORNeP8YBbWm-lFA/ryCtaVW_M?print-pdf)

[Use Sequelize ORM with PostgreSQL in Your Express Project](https://blog.devgenius.io/use-sequelize-orm-with-postgresql-in-your-express-project-3c277b289522)

[How to easily create a Postgres database in Docker](https://dev.to/andre347/how-to-easily-create-a-postgres-database-in-docker-4moj)
