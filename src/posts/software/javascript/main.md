# Title

## Purpose

For web applications with rich user experiences has driven the widespread adoption of JavaScript as a versatile and powerful language.

## Concept

Javascript, an object-oriented language, empowers developers to create reusable code through modules and classes, facilitating the maintenance and scalability of large code bases, while on the client-side, it enables real-time manipulation of web page content through the Document Object Model (DOM) without page refresh. Additionally, when used with Node.js on the server-side, JavaScript enables the development of full-stack web applications, integrating both client-side and server-side logic seamlessly.

### Forms

There are two different forms to construct objects, functional forms and class forms.

#### Functional Form

Objects in JavaScript are created using functions and closures, allowing for the definition of object behavior through nested functions within the constructor or by attaching functions to the object's prototype, with the this keyword referring to the object instance and enabling encapsulation and private variables through closures.

* Example
  ```javascript
  function createPerson(name, age) {
    // Private variables
    var _name = name;
    var _age = age;
  
    // Private function
    function increaseAge() {
      _age++;
    }
  
    // Public methods
    return {
      getName: function() {
        return _name;
      },
      getAge: function() {
        return _age;
      },
      celebrateBirthday: function() {
        increaseAge();
      }
    };
  }
  
  // Create an instance object
  var person = createPerson("John", 25);
  
  // Access the private variables using public methods
  console.log(person.getName()); // Output: "John"
  console.log(person.getAge()); // Output: 25
  
  // Try to access the private variables directly
  console.log(person._name); // Output: undefined
  console.log(person._age); // Output: undefined
  
  // Use public method to increase age
  person.celebrateBirthday();
  console.log(person.getAge()); // Output: 26
  ```

#### Class Form
  
* The class form was introduced in ECMAScript 2015 (ES6) as a syntactical sugar on top of the functional approach.
* Classes provide a more formal and structured way of defining objects with shared behavior and state.
* Objects are created using the new keyword followed by the class name.
* Object behavior is defined using methods within the class definition.
The this keyword also refers to the object instance that the method is called on.
* Inheritance
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

### Function

#### Structure

* Normal function
  ```javascript
  function add(a, b) {
    return a + b;
  }
  ```
* Arrow function
  ```javascript
  const add = (a, b) => a + b;
  ```

#### Arrow vs Normal

* Arrow functions can be written in a single line without using the `return`
* Binding of `this`:
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
  * The value of `this` in the arrow function `sayHelloArrow` refers to the global context, which does not have a `name` property.
  * The value of `this` in the normal function `sayHello` function refers to the object instance on which the function is called.
* Use of "arguments": Normal functions have access to a special variable called "arguments", which contains all the arguments passed to the function. Arrow functions do not have access to "arguments".
  ```javascript
  function sum() {
    let total = 0;
    for(let i=0; i<arguments.length; i++) { // arguments
      total += arguments[i];
    }
    return total;
  }
  
  const sumArrow = (...args) => args.reduce((total, num) => total + num, 0);
  
  console.log(sum(1, 2, 3, 4)); // output: 10
  console.log(sumArrow(1, 2, 3, 4)); // output: 10
  ```
  * In the above example, the normal function "sum" uses the "arguments" variable to calculate the sum of all the arguments passed to it. The arrow function "sumArrow" uses the spread operator to convert the arguments into an array and then uses the "reduce" method to calculate the sum.

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

If the JavaScript code makes use of asynchronous operations, such as fetching data from an external API, the order in which the code is executed may not be strictly linear. In such cases, the JavaScript runtime will handle the asynchronous operations separately from the main execution thread, and the order in which the asynchronous code is executed may not correspond to the order in which it appears in the file. For more information, please refer to [AJAX](/blog/software/javascript/AJAX).

### Execution Order in File

Normally, from top to bottom. But there are exceptions.

* Asynchronous Operations
  * Concept: Top-level import statements are processed first, ensuring that dependent modules are imported before use; module-level statements like variable declarations or function definitions are then processed, allowing references to imported modules; top-level export statements are lastly processed, determining what is accessible to other modules. Modules load and execute asynchronously, potentially deviating from their appearance in the code, which can lead to circular dependency problems requiring careful design to avoid.
  * Example
    ```javascript
    console.log("Start")

    setTimeout(() => {
        console.log("Timeout callback")
    }, 0);
    
    console.log("End")
    ```
  * Result
    ```bash
    Start
    End
    Timeout callback
    ```
* Module
  * 
  * Example
    ```javascript
    // moduleA.js
    console.log("Module A start")
    import { valueB } from './moduleB.js'
    console.log("Module A end")

    // moduleB.js
    console.log("Module B start")
    export const valueB = 42
    console.log("Module B end")

    // main.js
    import './moduleA.js'
    console.log("Main script")
    ```
  * Result
    ```bash
    Module A start
    Module B start
    Module B end
    Module A end
    Main script
    ```
* Function
  * Concept: Function needs to be declared before it is executed
  * Example: Pops error that it did not know `bark()`
    ```javascript
    function main() {
      const test = () => {
        console.log('test')
      }
    
      test()
      bark()
    
      const bark = () => {
        console.log('bark')
      }
    }
    
    main()
    ```
  * Example: no error because when execute `main`, all the functions is declared
    ```javascript
    function main() {
      test()
      bark()
    }

    const test = () => {
      console.log('test')
    }

    const bark = () => {
      console.log('bark')
    }
    
    main()
    ```

### datatype

In JavaScript, data types define the type of data that a variable or a value can hold. JavaScript has six primitive data types and one non-primitive data type. For more information, please refer to [datatype]({{site.baseurl}}/javascript/2022/12/25/datatype.html).

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

### Typescript

TypeScript is a statically typed superset of JavaScript that helps catch errors early in development by adding a type system to JavaScript, allowing developers to define variable types and function signatures, which helps detect type-related errors during compilation rather than at runtime.

#### Example

```ts
function addNumbers(a: number, b: number): number {
    return a + b;
}

let result = addNumbers(5, "2"); // TypeScript error: Argument of type '"2"' is not assignable to parameter of type 'number'.
```

#### interface

Interface is a way to define the structure or shape of an object. It specifies a contract that an object should adhere to, defining the properties and methods that the object must have. There are four common way to use interface.

* Defining Object Shape: You can use interfaces to define the structure of objects, specifying the names and types of their properties.
  ```ts
  interface Person {
    name: string;
    age: number;
  }
  
  const person: Person = { name: "John", age: 30 };
  ```
* Type Checking: Interfaces are used to enforce type checking. If an object doesn't match the interface's structure, TypeScript will throw a type error.
  ```ts
  const person: Person = { name: "John" }; // Error: Property 'age' is missing.
  ```
* Class Implementation: You can use interfaces to define contracts that classes must follow.
  ```ts
  interface Shape {
    area(): number;
  }
  
  class Circle implements Shape {
    constructor(private radius: number) {}
    area() {
      return Math.PI * this.radius * this.radius;
    }
  }
  ```
* Function Signatures: Interfaces can describe the shape of functions, specifying the types of their parameters and return values.
  ```ts
  interface MathOperation {
    (a: number, b: number): number;
  }
  
  const add: MathOperation = (a, b) => a + b;
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

### clone

* shallow clone
  ```javascript
  const originalObject = { key1: 'value1', key2: 'value2' };
  const shallowClone = { ...originalObject };
  ```
* deep clone
  ```javascript
  const originalObject = { key1: 'value1', nestedObject: { key: 'nestedValue' } };
  const deepClone = JSON.parse(JSON.stringify(originalObject));
  ```

## Reference

[Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

[ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)

[What are module exports in JavaScript?](https://www.educative.io/answers/what-are-module-exports-in-javascript )

[Tailwind Scroll back to top button component](https://tailwind-elements.com/docs/standard/components/scroll-back-to-top-button/)

[How can I split a javascript application into multiple files?](https://stackoverflow.com/questions/8752627/how-can-i-split-a-javascript-application-into-multiple-files)

[JavaScript Module Pattern: In-Depth](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)
