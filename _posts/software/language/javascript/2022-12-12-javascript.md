---
layout: post
title:
description: ''
date: '2022-12-12'
categories: javascript
note: 研究 arrow function
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish:
---

## Introduction

(TBC)

## Why?

* commonly used for creating interactive web applications
* allows you to add interactivity to your web pages by responding to user actions
* can run on a wide variety of platforms, including desktop and mobile web browsers
* many libraries and frameworks available for JavaScript that can help you build complex web applications more quickly and easily
* be used on the server-side with technologies like Node.js
* Growing demand

## How?

JavaScript is used in conjunction with popular web development frameworks like React, Angular, and Vue.js on the client-side to build complex and interactive web applications. On the server-side, JavaScript is used with Node.js to build web applications using popular frameworks like Express.js and NestJS, which provide a robust and scalable platform for building server-side logic.

* Object-oriented language
  * Using objects to represent data and functionality
  * This allows developers to create reusable code that can be organized into modules and classes, making it easier to maintain and update large codebase
* Client-side
  * Interact with the Document Object Model (DOM) of a web page, which allows developers to manipulate the content and structure of a page in real-time without requiring a full page refresh
* Server-side
  * NodeJS
  * Allows developers to use JavaScript to build full-stack web applications that can handle both client-side and server-side logic.

### Forms

* Functional Form
  * In the functional form, objects are created using functions and closures.
  * Object behavior is defined using nested functions within the constructor function or by attaching functions to the object's prototype.
  * The this keyword refers to the object being created or the object instance that the method is called on.
  * This approach allows for encapsulation and private variables through the use of closures.
* Class Form
  * The class form was introduced in ECMAScript 2015 (ES6) as a syntactical sugar on top of the functional approach.
  * Classes provide a more formal and structured way of defining objects with shared behavior and state.
  * Objects are created using the new keyword followed by the class name.
  * Object behavior is defined using methods within the class definition.
The this keyword also refers to the object instance that the method is called on.

### Class Form

After ECMAScript 2015 (ES6)

```javascript
// Parent class
class ParentClass {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log('Hello, ' + this.name + '!');
  }
}

// Child class
class ChildClass extends ParentClass {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  introduce() {
    console.log('My name is ' + this.name + ' and I am ' + this.age + ' years old.');
  }
}

// Usage
const child = new ChildClass('Alice', 25);
child.greet();      // Output: Hello, Alice!
child.introduce();  // Output: My name is Alice and I am 25 years old.
```

### Function

* Arrow vs normal function
  * Syntax: Arrow functions have a more concise syntax compared to normal functions. They can be written in a single line without using the "return" keyword.
    ```javascript
    // Normal function
    function add(a, b) {
      return a + b;
    }
  
    // Arrow function
    const add = (a, b) => a + b;
    ```
  * Binding of "this": In arrow functions, the "this" keyword refers to the enclosing context, while in normal functions, the value of "this" is determined by how the function is called.
    ```javascript
    const person = {
      name: "John",
      sayHello: function() {
        console.log("Hello, my name is " + this.name);
      },
      sayHelloArrow: () => {
        console.log("Hello, my name is " + this.name);
      }
    };
    
    person.sayHello(); // output: Hello, my name is John
    person.sayHelloArrow(); // output: Hello, my name is undefined
    ```
    * In the above example, the value of "this" in the arrow function "sayHelloArrow" refers to the global context, which does not have a "name" property.
  * Use of "arguments": Normal functions have access to a special variable called "arguments", which contains all the arguments passed to the function. Arrow functions do not have access to "arguments".
    ```javascript
    function sum() {
      let total = 0;
      for(let i=0; i<arguments.length; i++) {
        total += arguments[i];
      }
      return total;
    }
    
    const sumArrow = (...args) => args.reduce((total, num) => total + num, 0);
    
    console.log(sum(1, 2, 3, 4)); // output: 10
    console.log(sumArrow(1, 2, 3, 4)); // output: 10
    ```
    * In the above example, the normal function "sum" uses the "arguments" variable to calculate the sum of all the arguments passed to it. The arrow function "sumArrow" uses the spread operator to convert the arguments into an array and then uses the "reduce" method to calculate the sum.
* Protected methods in class
  ```javascript
  class MyClass {
    constructor() {
      this._protectedProperty = 'foo';
    }
  
    _protectedMethod() {
      console.log('This method is protected');
    }
  
    publicMethod() {
      console.log('This is a public method');
      this._protectedMethod(); // call the protected method from within the class
    }
  }
  ```

### Execution Order

* Normally, from top to bottom
* Function: If a function is defined in the file but not called until later in the code, the function definition will still be processed when the file is loaded, but the function itself will not be executed until it is called.
* Asynchronous: If the JavaScript code makes use of asynchronous operations, such as fetching data from an external API, the order in which the code is executed may not be strictly linear. In such cases, the JavaScript runtime will handle the asynchronous operations separately from the main execution thread, and the order in which the asynchronous code is executed may not correspond to the order in which it appears in the file.
* Module
  * Firstly, any top-level import statements will be processed before any other code in the file is executed. This means that if a module depends on another module, the dependent module must be imported first.
  * Secondly, any module-level statements, such as variable declarations or function definitions, will be processed. These statements can reference any imported modules, since the import statements have already been processed.
  * Finally, any top-level export statements will be processed. These statements determine which functions, objects, or variables from the module should be exposed to other modules that import it.
  * Modules are loaded and executed asynchronously, so the order in which they are loaded and executed may not correspond to the order in which they appear in the code. This can lead to issues with circular dependencies, where two or more modules depend on each other, but neither can be loaded until the other has been loaded. To avoid circular dependency issues, it's important to design module dependencies carefully and avoid circular references wherever possible.

### 

### datatype

In JavaScript, data types define the type of data that a variable or a value can hold. JavaScript has six primitive data types and one non-primitive data type. For more information, please refer to [datatype]({{site.baseurl}}/javascript/2022/12/25/datatype.html)

### operators

```javascript
// Arithmetic operators:
let a = 5 + 3;     // addition
let b = 10 - 4;    // subtraction
let c = 6 * 2;     // multiplication
let d = 8 / 2;     // division
let e = 15 % 4;    // modulus (returns the remainder after division)

// Comparison operators:
let f = 5 > 3;      // greater than (returns true)
let g = 10 <= 4;    // less than or equal to (returns false)
let h = "hello" === "world";  // strict equality (returns false)
let i = "hello" !== "world";  // strict inequality (returns true)

// Logical operators:
let j = true && false;    // logical AND (returns false)
let k = true || false;    // logical OR (returns true)
let l = !true;            // logical NOT (returns false)
```

going to add more strange logic in javascript

### Control Structure

* Conditional Statements:
  * `if` statement
```javascript
let x = 10;
if (x > 5) {
  console.log("x is greater than 5");
}
```
  * `switch` statement
```javascript
let day = "Monday";
switch(day) {
  case "Monday":
    console.log("It's Monday!");
    break;
  case "Tuesday":
    console.log("It's Tuesday!");
    break;
  default:
    console.log("It's not Monday or Tuesday.");
    break;
}
```
  * Loops
    * for loop
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```
    * while loop
```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```
* Control Statements
  * break
```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}
```
  * continue (skip over an iteration of a loop)
```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}
```

### OOP

something like

```javascript
const randomObject = {
  attributes1: 'attributes1',
  ...
}
```

### built-in methods

JavaScript has many built-in methods that provide powerful functionality to manipulate strings, arrays, and other data types. These methods are part of the JavaScript language and can be called directly on the objects they operate on. For more information, please refer to [methods]({{site.baseurl}}/javascript/2022/12/25/methods.html)

### error handling

You can return error with

```javascript
throw "Error occurred";
```

### Promises and Asynchronous

Asynchronous programming is usually implemented using callbacks or Promises
* JavaScript is a single-threaded language, which means that it can only execute one task at a time
* A callback is a function that is passed as an argument to another function, and is called when the other function completes its task. This allows the program to continue executing while the asynchronous task is being performed in the background. We can ensure that the data is processed only when it is available, rather than blocking the program while waiting for the data to be fetched. This allows the program to continue executing other tasks while the data is being fetched in the background. For example,

```javascript
function fetchData(callback) {
  // simulate fetching data from a server
  setTimeout(function() {
    const data = [1, 2, 3, 4, 5];
    callback(data);
  }, 200);
  console.log('Process this first')
}

function processData(data) {
  console.log("Processing data:", data);
}

// Call fetchData function and pass processData function as a callback
fetchData(processData);
```

* Promise is another way to implement asynchronous programming in JavaScript. A Promise is an object that represents a value that may not be available yet. When a Promise is resolved, the value is made available to the program. Promises can be chained together using the then() method to create a sequence of asynchronous tasks. For example,

```javascript
function fetchData() {
  // return a new Promise
  return new Promise(function(resolve, reject) {
    // simulate fetching data from a server
    setTimeout(function() {
      const data = [1, 2, 3, 4, 5];
      resolve(data); // fulfill the promise with the data
    }, 2000);
  });
}

function processData(data) {
  console.log("Processing data:", data);
}

// Call fetchData function which returns a promise
fetchData().then((data) => processData(data));
```

  * Async/await is a newer syntax introduced in ES2017 that provides a more intuitive way to write asynchronous code. It allows developers to write asynchronous code that looks and behaves like synchronous code, making it easier to reason about and debug. Async/await works by using Promises under the hood, but hides the details of Promise chaining and error handling.

### AJAX

[AJAX]({{site.baseurl}}/javascript/2021/06/19/AJAX.html)

### JSON

### Import and Export

[Import and Export]({{site.baseurl}}/javascript/2023/04/06/import-export.html)

### service

A service can refer to a type of object or module that provides a specific functionality or feature to an application. For example,

```javascript
function MyService() {
  constructor() {
    // initialize properties or perform setup tasks
  },
  this.perform = function() {
    // implementation
  };
}
```

### Document Object Model (DOM)

* Url
  * Get current url: `window.location.href`
* redirect
* open new tab
  ```javascript
  window.open(url, '_blank').focus();
  ```

### other topics

* Objects and prototypes
* Arrays and array methods
* String manipulation
* Regular expressions
* Date and time
* Error handling and debugging
* DOM (Document Object Model) manipulation
* Events and event handling
* AJAX (Asynchronous JavaScript and XML)
* APIs (Application Programming Interfaces)
* ES6 (ECMAScript 2015) features, such as arrow functions, template literals, and classes
* Functional programming concepts in JavaScript, such as higher-order functions, closures, and currying
* Node.js and server-side JavaScript
* Popular JavaScript libraries and frameworks, such as React, Angular, and Vue.js
* Best practices and code organization

## What

### scroll to the top

with tailwind

```HTML
<button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" class="inline-block p-3 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out bottom-5 right-5" id="btn-back-to-top">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
</button>
```

and JS

```javascript
// Get the button
let myButton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
myButton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
```

## Reference

[Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

[ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)

[What are module exports in JavaScript?](https://www.educative.io/answers/what-are-module-exports-in-javascript )

[Tailwind Scroll back to top button component](https://tailwind-elements.com/docs/standard/components/scroll-back-to-top-button/)

[How can I split a javascript application into multiple files?](https://stackoverflow.com/questions/8752627/how-can-i-split-a-javascript-application-into-multiple-files)

[JavaScript Module Pattern: In-Depth](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)
