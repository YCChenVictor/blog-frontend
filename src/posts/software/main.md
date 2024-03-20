# (Self) Software

## Purpose

To acquire the skills and knowledge necessary to design, develop, and utilize digital tools and applications to solve problems and improve efficiency in various domains.

## Concept

Software is essentially a collection of instructions and data that dictates the actions and behavior of a computer system. These instructions, typically written in a programming language, outline the steps the computer should follow to perform specific tasks, while the data provides the necessary information for these tasks to be executed. Together, they serve as the guiding force behind the computer's operations, enabling it to process information, run applications, and interact with users or other systems. In essence, software acts as the bridge between users and the hardware components of a computer, translating human-readable commands and tasks into machine-executable instructions. Without software, computers would be inert machines devoid of functionality, incapable of carrying out the myriad tasks they are commonly used for in today's digital age.

### Fundamental Knowledge

#### Complexity

Complexity is a fundamental characteristic of systems, phenomena, and processes that exhibit intricate interconnections, dependencies, and behaviors. It involves the study and understanding of intricate patterns, emergent properties, and nonlinear dynamics, challenging traditional reductionist approaches and requiring holistic perspectives to unravel its multifaceted nature. For more information, please refer to [complexity](/blog/software/dsa/complexity).

#### Data Structures and Algorithms

[Data Structures and Algorithms (DSA)](/blog/software/dsa/main) are essential foundations in software development, providing the tools and techniques to organize and manipulate data efficiently, optimize code performance, and solve complex problems in a systematic and scalable manner. Mastery of DSA enables developers to design robust software solutions, improve algorithmic efficiency, and create optimized code for various applications and domains.

#### Object Oriented Design

Object-oriented design is a fundamental aspect of software development, emphasizing the creation of elegant and maintainable code through the organization of classes and methods to solve problems or represent real-life entities. By applying object-oriented principles, developers can achieve modularity, reusability, and improved quality in their software systems. For more information, please refer to [object oriented design](/blog/software/ood/main).

#### System Design

System design involves creating a blueprint for the structure and organization of a software system, considering factors such as architecture, modules, interfaces, and data flow. It aims to transform requirements into an efficient and scalable solution that meets the desired goals and objectives of the system. For more information, please refer to [system design](/blog/software/system-design/main).

#### Refactor

Refactoring is the process of improving code quality and structure without changing its external behavior, essential for enhancing software maintainability and reducing technical debt. It involves making small, incremental changes to optimize code, making it easier to understand and extend. For more information, please refer to [refactor]().

#### API

[API]

#### Cache

[Cache]

### System software

This type of software is designed to manage and control the hardware and software resources of a computer system. Examples include operating systems like Windows, macOS, and Linux, as well as device drivers and utility programs like antivirus software and disk management tools. For more information, please refer to [operating systems](/blog/software/os/main).

### Web Application software

This type of software is designed for specific tasks or applications, such as word processing, spreadsheet creation, email management, and graphic design. Examples include Microsoft Office, Adobe Creative Suite, and Google Chrome.

#### Internet

[internet](/blog/software/internet/main)

#### Plan and Design

Plan and design the user interface and functionality of your web application.

* Server-side rendering
  * Advantage: Efficient search engine indexing, better performance on low-powered devices, and improved accessibility.
  * Concept: Generates the HTML content on the server and sending it to the client's web browser for display.
  * Example: Rails
* Client-side rendering with a separation of concerns
  * Advantage: This approach offers a more interactive and responsive user experience since the client can manipulate the DOM and fetch data asynchronously without full page reloads.
  * Concept: The frontend is the user-facing part of an application responsible for displaying and interacting with the interface, the backend handles data processing and logic, and Token-based authentication and authorization mechanisms ensure secure data transmission between the frontend and backend by utilizing tokens as digital credentials for validating user identity and permissions.
  * Example: React + Node

#### Frontend

* [React] is a popular JavaScript library for building user interfaces, known for its efficient rendering and component-based architecture. Developed by Facebook, React allows developers to create reusable UI components and seamlessly update them as the application state changes, resulting in faster and more interactive web applications.

#### Backend

* Framework: [Express], or [Ruby on Rails]
* [Database](/blog/software/database/main)

#### Test

Test-Driven Development ([TDD](/blog/software/tdd/main)) involves writing tests before code to guide development, ensuring early and thorough software testing and aligning code with intended functionality, ultimately enhancing code quality and reducing defects. TDD's approach helps catch issues early, leading to more reliable software and efficient development.

#### Package Managers

* Javascript: [Npm], [Yarn]
* Ruby: [Gem]

#### Deploy and Maintain

* [Deploy] your web application to a web server
* Maintain it by regularly updating it with bug fixes and [security] patches
* [scale up] the application to handle increased traffic or integrating it with other systems.
* [Quality Assurance]

### Embedded software

This type of software is designed to control and manage hardware devices and systems, and is often built into the devices themselves. Examples include the software that controls a car's engine, a digital camera's image processing, or a smart thermostat's temperature control.

* [Robotic]

### Mobile Applications

Includes iOS and Android apps, which have unique characteristics and development considerations.

### Artificial Intelligence (AI) and Machine Learning (ML)

Encompasses software that uses AI and ML algorithms for tasks such as image recognition, natural language processing, and predictive analytics.

### Internet of Things (IoT)

Involves software that controls and communicates with connected devices in the IoT ecosystem.

### Serverless Architectures

Represents a paradigm where applications are built using serverless functions and cloud services, often challenging traditional categorizations.

#### Examples

AWS Lambda: The primary compute service for serverless functions on Amazon Web Services. Serverless Framework simplifies the deployment and management of AWS Lambda functions.

Amazon API Gateway: Enables the creation, deployment, and management of RESTful APIs. Serverless Framework integrates with API Gateway to expose HTTP endpoints for serverless functions.

Amazon DynamoDB: A fully managed NoSQL database service. Serverless applications often use DynamoDB for data storage, and the framework can automate the provisioning of DynamoDB tables.

Amazon S3: A scalable object storage service. Serverless applications may use S3 for storing and retrieving data, and the framework can configure events to trigger functions based on S3 events.

Amazon SQS and SNS: Simple Queue Service (SQS) for message queuing and Simple Notification Service (SNS) for pub/sub messaging. Serverless Framework supports integrating with SQS and SNS to handle asynchronous messaging in serverless applications.

Amazon EventBridge: A serverless event bus service. Serverless Framework can be used to configure functions to respond to events from EventBridge, enabling event-driven architectures.

Azure Functions: Microsoft Azure's serverless compute service. Serverless Framework supports deploying and managing functions on Azure, extending its multi-cloud capabilities.

Google Cloud Functions: Google Cloud's serverless compute service. Serverless Framework supports deploying and managing functions on Google Cloud, providing another option for multi-cloud deployments.

Auth0: An identity and access management service. Serverless Framework can be configured to handle authentication and authorization using Auth0 in serverless applications.

Twilio: A cloud communications platform. Serverless Framework can integrate with Twilio for handling SMS, voice, and other communication functionalities in serverless applications.

Datadog, New Relic, and other Monitoring Services: Serverless Framework supports integrations with various monitoring and logging services to help developers monitor the performance and health of serverless applications.

### Augmented Reality (AR) and Virtual Reality (VR)

Encompasses software that creates immersive experiences, often used in gaming, training, or simulations.
