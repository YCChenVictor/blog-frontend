---
layout: post
title:
description: ''
date: '2023-06-14'
categories:
note:
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

(2023/06/15)

## What?

## Reference
