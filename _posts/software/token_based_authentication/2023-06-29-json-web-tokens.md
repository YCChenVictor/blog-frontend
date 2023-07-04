---
layout: post
title:
description: ''
date: '2023-06-29'
categories: token_based_authentication
note:
mathjax:
mermaidJS: true
p5JS:
chartJS:
threeJS:
publish: true
---

## Introduction

quick explanation

## Why?

JWT (JSON Web Token) are used as a secure and compact means of transmitting and verifying claims or information between parties, enabling stateless authentication and authorization in distributed systems.

## How?

### Concept

<div class="mermaid">
  graph LR
    user(User) -- email, password --> sign_up_or_login_page[Sign Up or Login Page]
    sign_up_or_login_page[Landing Page] -- email, password --> jwt_service_create[JWT Creation Service]
    jwt_service_create[JWT Creation Service] -- JWT --> user(User)
    user(User) -- JWT --> secured_website(Secured Website)
    secured_website(Secured Website) -- JWT --> jwt_service_validate[JWT Validation Service]
    jwt_service_validate[JWT Validation Service] -- validate? --> secured_website(Secured Website)
    secured_website(Secured Website) -- validate? == yes --> show_page((Show Page))
    secured_website(Secured Website) -- validate? == no --> no_page((No Page))
</div>

In the context of the provided graph, JWT serves as a **secure token** that facilitates the reliable exchange of **user information** between two parties involved.
* User information: We called it claims; for example, the user's name, ID, roles, or any other relevant data.
* Secure token (2023/07/04)
  * Encoding: The JSON object is then Base64Url encoded to produce a compact string, which forms the JWT. This encoding ensures that the JWT can be easily transmitted across different systems without any loss of data.
  * Signature: To ensure the integrity of the JWT and to prevent tampering, a signature is generated. The signature is created using a secret key that is shared between the parties involved. It is calculated over the encoded JWT and appended to it, separated by a period.
* Transmission: The JWT is typically sent from the client to the server in the Authorization header of an HTTP request. It is commonly transmitted as a Bearer Token, meaning it is prefixed with the word "Bearer" followed by a space, before the actual JWT.
* Verification: On the server-side, the received JWT's signature is verified using the shared secret key. If the signature is valid, it signifies that the JWT has not been tampered with during transmission. The information contained within the JWT can then be trusted and used to perform authorized actions.

### Example

Let's consider an e-commerce website where users can place orders, and there are different levels of access and privileges for customers and administrators.

User Registration:

A user named Alice visits the e-commerce website and creates an account by providing her email and password.
The server verifies the credentials, and upon successful registration, it generates a JWT for Alice.

Authentication:

When Alice wants to access her account or perform any authorized actions, she sends her JWT to the server in the Authorization header of an HTTP request as a Bearer Token.
The server receives the request and validates the JWT's signature using the shared secret key.
If the signature is valid, the server trusts the information in the JWT and authenticates Alice based on the claims in the payload.

User Actions:

Alice decides to place an order for a product. She adds items to her cart and proceeds to the checkout page.
The client application includes Alice's JWT in the Authorization header when making a request to the server to place the order.
The server receives the request, verifies the JWT's authenticity, and extracts relevant information like Alice's user ID and order details from the JWT payload.
Based on Alice's authorization level (e.g., customer), the server performs the necessary business logic to process the order.

Administrator Actions:

Meanwhile, a user named Bob, who is an administrator, wants to access the admin panel to manage products and orders.
Bob's client application includes his JWT with the appropriate administrator privileges in the Authorization header of the HTTP request.
The server validates Bob's JWT, verifies his identity and authorization level, and allows him access to the admin panel.
Based on the claims in Bob's JWT, the server presents relevant information and functionality for managing products and orders.

## What?

### Scenario

### In React + Node



## Reference
