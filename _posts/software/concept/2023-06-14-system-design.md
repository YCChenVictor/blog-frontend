---
layout: post
title:
description: ''
date: '2023-06-14'
categories:
note: in the Design An Algorithm section, we should have an example first. Remember to connect the sections with other articles
publish: true
mathjax:
mermaidJS:
p5JS:
chartJS:
threeJS:
---

## Introduction

TBC

## Why?

System design is essential to ensure that a software system is well-structured, efficient, and capable of meeting its intended goals and requirements, providing a roadmap for the development process and enabling successful implementation.

## How?

### Design Whole System

For example, let's design TinyURL

* Step 1: Scope the Problem, ask lots of questions to define user stories and get the requirements. After the questions, we should know the requirements:
  * Shortening a URL to a TinyURL
  * Analytics for a URL
  * Retrieving the URL associated with a TinyURL
  * User accounts and link management
* Step 2: Make Reasonable Assumptions
  * Based on step 1, given each requirement, we need to think about Feasibility, Impact Analysis, Scalability and Extensibility
  * Feasibility
    * technical constraints
    * resource availability
    * time constraints
  * Impact Analysis
    * functionality
    * performance
    * security
    * user experience
  * Scalability and Extensibility
    * increasing user load
    * additional features
    * integration with new technologies
* Step 3: Draw the Major Components (on whiteboard)
  * Frontend
    * User Interface: The UI component serves as the visual gateway for users to interact with the system, enabling them to input URLs, access analytics, manage links, and perform various actions through pages, forms, buttons, and other interface elements.
    * URL Shortening Form: The URL Shortening Form component captures user-inputted long URLs, validating and handling potential errors, before forwarding the data to the backend for processing.
    * Analytics Dashboard: The analytics dashboard component presents visually appealing and user-friendly statistics and insights, including click counts, referral sources, and geographical data, for the shortened URLs.
    * User Account Management: The User Account Management component facilitates user registration, login, and account management functionalities, providing forms for actions such as registration, login, password reset, and profile management.
  * Backend
    * API: The backend exposes APIs that define the contract for request and response formats, allowing seamless communication and interaction between the frontend and backend components of the system.
    * URL Shortening Service: The URL Shortening Service component generates unique and concise aliases (TinyURLs) for long URLs received from the frontend, utilizing algorithms or mapping mechanisms to create and store mappings between the TinyURLs and their corresponding original URLs.
    * Analytics Engine: The Analytics Engine component processes and aggregates data on URL clicks, referral sources, and other metrics, storing the information to generate reports and provide valuable analytics insights, while the User Management System component handles user account management, authentication, authorization, and tasks such as registration, login, password management, and link ownership.
    * Database: The Database component efficiently stores and retrieves the required data for the system, encompassing tables or collections that hold information such as URLs, analytics data, user accounts, and link management.
    * External Services Integration: The backend may need to integrate with external services, such as geolocation services for gathering geographical data or third-party authentication services for user account management.
* Step 4: Identify the Key Issues
  * Based on information in step 2 and step 3, determine the priorities and know which bottleneck should be solved first; for example, the frontend and backend for user to input URL has the highest priority and the boss actually care security more than performance, so although we know cache the urls on frontend will be faster, we still let user to query them because we do not want to store the urls on frontend for hackers.
* Step 5: Redesign for the Key Issues
  * After step 4, we should adjust our design; for example, some components take too much time but is not that important, so we can remove it currently from the major components.

### Design An Algorithm

Sometimes we do not need to re-design a system but we want to solve an algorithm.

* Step 1: Ask Questions, try to find out the input and output of this function.
* Step 2: Make Believe, assume there is no limitations first, so that we can find the general solutions.
* Step 3: Get Real, try to write down pseudocode first and even start compose the functions.
* Step 4: Solve Problems, during step 3, there will be more problems occurs and keep iterating.

### Key concepts

#### Horizontal Scaling

TBC, connect with the articles

#### Vertical Scaling

### Considerations

* Failures
  * Concept: Systems are prone to failures, and it's crucial to plan for them. Identify potential points of failure in your system and design appropriate measures to handle them.
  * Example
    * Redundancy
    * Fault tolerance
    * Error handling
    * Disaster recovery strategies.
* Availability and Reliability
  * Concept: Availability refers to the percentage of time a system is operational and accessible to users. Reliability is the probability that the system will remain operational over a specified period.
  * Example
    * Load balancing
    * Clustering
    * Monitoring
    * Automated failover
* Read-heavy vs. Write-heavy
  * Concept: Depending on whether your system is more read-heavy or write-heavy, you can design strategies such as queuing writes for write-intensive applications or utilizing caching mechanisms for read-intensive applications to optimize performance and mitigate potential failures.
* Security
  * Security threats pose significant risks to a system. Identify potential security vulnerabilities and design appropriate security measures to protect your system. This can include authentication mechanisms, access controls, encryption, input validation, and robust error handling to prevent attacks like injection, cross-site scripting, and data breaches.
* Scalability: Design your system to handle increased workload and accommodate future growth. Consider horizontal scaling (adding more machines) and vertical scaling (increasing the resources of existing machines). Use technologies like load balancing, distributed architectures, and database sharding to ensure scalability.
* Performance: Optimize your system for efficient and responsive performance. Consider factors like response times, throughput, latency, and resource utilization. Use techniques such as caching, indexing, query optimization, and efficient algorithms to enhance performance.
* Data Storage and Persistence: Determine the appropriate data storage mechanisms based on your system requirements. Consider factors like data volume, access patterns, data consistency, and durability. Choose between relational databases, NoSQL databases, file systems, caching solutions, or a combination of these based on your specific needs.
* Interoperability and Integration: If your system needs to interact with external systems or services, design it to be interoperable and easily integrable. Use standard protocols, APIs, and well-defined interfaces to enable seamless communication and data exchange between different components or systems.
* Maintainability: Plan for long-term maintenance and ease of system management. Follow best practices like modular design, clean code principles, documentation, version control, and automated testing. Design your system to be easily diagnosable and upgradeable.
* Cost-effectiveness: Consider the cost implications of your system design decisions. Evaluate the trade-offs between performance, scalability, and cost. Optimize resource utilization, consider cloud services or open-source alternatives, and assess the total cost of ownership (TCO) over the system's lifecycle.

## What?

## Reference