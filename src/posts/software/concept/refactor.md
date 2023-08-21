## When

### Code Maintainability

Refactoring improves code readability and organization, making it easier for developers to understand, update, and fix issues.

* React: ESLint, Prettier

### Code Duplication

Refactoring helps eliminate duplicated code, reducing maintenance efforts and the risk of introducing bugs.

* ESLint with eslint-plugin-react
  * Install
    ```bash
    npm install eslint eslint-plugin-react --save-dev
    ```
  * Configure (in ./eslintrc.js)
    ```js
    // .eslintrc.js
    module.exports = {
      plugins: ['react'],
      extends: ['eslint:recommended', 'plugin:react/recommended'],
      rules: {
        // Define rules specific to React and code quality here
      },
    };
    ```
  * run
    ```bash
    npx eslint src/
    ```

### Scalability

Refactoring prepares code for future enhancements by breaking it into modular components that can be extended or modified more easily.
