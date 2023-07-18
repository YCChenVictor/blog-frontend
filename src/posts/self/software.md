# (Self) Software

## Introduction

Software refers to a set of instructions or programs that tell a computer what to do. It encompasses all the applications, programs, and data that run on digital devices, enabling them to perform various tasks and functions.

## Why?

For me as web developer
* Automate repetitive tasks
* Improved job performance
* Enhanced creativity of future

## How?

Software is a set of instructions and data that tell a computer what to do.

### Concepts

#### Complexity

Complexity is a fundamental characteristic of systems, phenomena, and processes that exhibit intricate interconnections, dependencies, and behaviors. It involves the study and understanding of intricate patterns, emergent properties, and nonlinear dynamics, challenging traditional reductionist approaches and requiring holistic perspectives to unravel its multifaceted nature. For more information, please refer to [complexity]({{site.baseurl}}/dsa/2022/05/02/complexity.html).

#### Data Structures and Algorithms

[Data Structures and Algorithms (DSA)]({{site.baseurl}}/dsa/2021/11/25/data-structure-and-algorithm.html) are essential foundations in software development, providing the tools and techniques to organize and manipulate data efficiently, optimize code performance, and solve complex problems in a systematic and scalable manner. Mastery of DSA enables developers to design robust software solutions, improve algorithmic efficiency, and create optimized code for various applications and domains.

#### Bit

Bit manipulation is a programming technique that involves manipulating individual bits or groups of bits within **binary representations** of data. It is commonly used to perform efficient operations on binary data, optimize code, and solve specific algorithmic problems. For more information, please refer to [bit manipulation]()

#### Object Oriented Design

Object-oriented design is a fundamental aspect of software development, emphasizing the creation of elegant and maintainable code through the organization of classes and methods to solve problems or represent real-life entities. By applying object-oriented principles, developers can achieve modularity, reusability, and improved quality in their software systems. For more information, please refer to [object oriented design]()

#### System Design

System design involves creating a blueprint for the structure and organization of a software system, considering factors such as architecture, modules, interfaces, and data flow. It aims to transform requirements into an efficient and scalable solution that meets the desired goals and objectives of the system. For more information, please refer to [system design]()

#### Development

* Concept: TDD, BDD

### System software

This type of software is designed to manage and control the hardware and software resources of a computer system. Examples include operating systems like Windows, macOS, and Linux, as well as device drivers and utility programs like antivirus software and disk management tools. For more information, please refer to [operating systems]({{site.baseurl}}/os/2023/04/02/overview.html).

### Web Application software

This type of software is designed for specific tasks or applications, such as word processing, spreadsheet creation, email management, and graphic design. Examples include Microsoft Office, Adobe Creative Suite, and Google Chrome.
    
#### Plan and Design

Plan and design the user interface and functionality of your web application. Decide on the features you want to include and how users will interact with the application.
* Server-side rendering
  * Advantage: Efficient search engine indexing, better performance on low-powered devices, and improved accessibility
  * Concept: Generates the HTML content on the server and sending it to the client's web browser for display
  * Example: rails
* Client-side rendering with a separation of concerns
  * Advantage: This approach offers a more interactive and responsive user experience since the client can manipulate the DOM and fetch data asynchronously without full page reloads.
  * Concept: The frontend is the user-facing part of an application responsible for displaying and interacting with the interface, the backend handles data processing and logic, and Token-based authentication and authorization mechanisms ensure secure data transmission between the frontend and backend by utilizing tokens as digital credentials for validating user identity and permissions.
  * Example: React + Node

#### Develop

Write the code for your web application, including the frontend (user interface) and the backend (server-side logic).

#### Frontend

* React is a popular JavaScript library for building user interfaces, known for its efficient rendering and component-based architecture. Developed by Facebook, React allows developers to create reusable UI components and seamlessly update them as the application state changes, resulting in faster and more interactive web applications. For more information, please refer to [React]({{site.baseurl}}/react/2021/06/13/react.html).
* Vue
* Angular
* Test: [Jest]

#### Backend

* Framework: [Node.js]({{site.baseurl}}/node/2022/12/30/node.html), or [Ruby on Rails]({{site.baseurl}}/rails/2023/01/01/rails.html)
* Test: [Jest], [Rspec]
* [Token-based authentication and authorization mechanisms]({{site.baseurl}}/token_based_authentication/2022/08/17/authentication.html): Token-based authentication and authorization mechanisms provide a secure and efficient means of verifying user identity and permissions in web applications and APIs. By utilizing tokens as digital credentials, these mechanisms enhance web security, enable stateless and scalable architectures, and ensure secure data transmission between the frontend and backend.

#### Package

* Javascript: [Npm & Yarn]({{site.baseurl}}/package/2023/02/03/package.html)
* Ruby: [Gem]

#### Deploy and Maintain

* [Deploy]() your web application to a web server
* Maintain it by regularly updating it with bug fixes and [security]({{site.baseurl}}/web-security/2022/08/30/web-security.html) patches
* [scale up]() the application to handle increased traffic or integrating it with other systems.
* [Quality Assurance]({{site.baseurl}}/test/2022/09/02/quality-assurance.html)

### Embedded software

This type of software is designed to control and manage hardware devices and systems, and is often built into the devices themselves. Examples include the software that controls a car's engine, a digital camera's image processing, or a smart thermostat's temperature control.

## What?

* [blog]({{site.baseurl}}/project/1993/09/01/(project)-blog.html)
* [task]({{site.baseurl}}/project/1993/09/01/(project)-task.html)

## Reference
