# title

## Purpose

TBC

## Concept

### migration

Migration in database is necessary to manage and track changes in the structure and content of a database, such as adding or modifying tables, columns, or data. It allows for a more organized and controlled approach to database development, deployment, and maintenance.

#### Install Sequelize

```bash
npm install --save sequelize
npm install -g sequelize-cli
```

#### configuration

* Use it in ES6 (reference: [Sequelize - run migration with es6 and modules](https://stackoverflow.com/questions/68304477/sequelize-run-migration-with-es6-and-modules))
  ```
  npm i --save-dev babel-register
  ```
* Create `./.sequelizerc` with
  ```javascript
  require("babel-register");

  const path = require('path');

  module.exports = {
    config: path.resolve('./database', 'config.js'),
    'models-path': path.resolve('./models'),
    'seeders-path': path.resolve('./database/seeders'),
    'migrations-path': path.resolve('./database/migrations'),
  };
  ```
* Init to create `config`, `models`, `seeders` and `migrations` in `./database`
  ```bash
  sequelize init
  ```
  * It will create `config.js` and `model/index.js`
* In `config.js`
  ```javascript
  import 'dotenv/config';
  
  export default {
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
* In `.env`,
  ```bash
  DEV_DATABASE_URL=postgres://postgres:test1234@127.0.0.1:5432/my_db
  ```
  * remember to change `test1234`, `my_db` to what you desired

#### migration file

* Create model; for example, user
  ```bash
  sequelize model:generate --name user --attributes name:string,mail:string,password:string
  ```
  * It will create `models/user.js` and `migrations/...create-user.js`
  * Then you can setup constraints in migration file:
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
  * Also the user model
    ```javascript
    'use strict';

    import { Model } from 'sequelize';
    
    export default (sequelize, DataTypes) => {
      class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
          // define association here
        }
      }
      user.init({
        name: DataTypes.STRING,
        mail: DataTypes.STRING,
        password: DataTypes.STRING
      }, {
        sequelize,
        modelName: 'user',
      });
      return user;
    };
    ```
    * The model generated itself is pretty strange, we can modified it to ([reference](https://sequelize.org/docs/v6/core-concepts/model-basics/))
      * index.js
      * In `model/index.js`
        ```javascript
        'use strict';
      
        const dotenv = require('dotenv');
        dotenv.config();
        
        const Sequelize = require('sequelize');
        
        let sequelize
        if (process.env.NODE_ENV === 'development') {
          sequelize = new Sequelize(process.env.DEV_DATABASE_URL)
        } else if (process.env.NODE_ENV === 'test') {
          sequelize = new Sequelize(process.env.TEST_DATABASE_URL)
        } else {
          sequelize = new Sequelize(process.env.DATABASE_URL)
        }
        
        module.exports = sequelize;
        ```
      * In `model/user.js`
        ```javascript
        'use strict';
  
        import Sequelize from 'sequelize';
        import sequelize from './index.js';
        
        const user = sequelize.define('user', {
          email: {
            type: Sequelize.STRING,
          },
          password: {
            type: Sequelize.STRING
          }
        })
        
        export default user
        ```
* run migration
  ```bash
  npx sequelize-cli db:migrate
  ```
* (TBC) Add column, for example, I want to add column, purpose to tasks table
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

#### Migrate

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

* all
```bash
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```

## Reference
