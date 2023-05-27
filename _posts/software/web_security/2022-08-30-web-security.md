---
layout: post
title:
description: ''
date: '2022-08-30'
categories: web-security
note: 把下面的 section 跟列點的整合再一起
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

Web security is the practice of protecting websites and web applications from unauthorized access, data theft, and other malicious activities. It involves implementing a range of security measures, including authentication, encryption, and access control, to safeguard sensitive information and ensure the integrity and availability of web-based resources.

## Why?

It helps to prevent unauthorized access, data breaches, and other malicious activities that can compromise the confidentiality, integrity, and availability of web-based resources.

## How?

### Authentication and Authorization

A strong authentication system that verifies user credentials and authorization policies that determine what users can and cannot access is essential to maintain security.
* Broken Authentication and Session Management: Related to user authentication and session management
  * weak passwords
  * session hijacking
  * broken logout functionality
* Broken Access Control: Broken Access Control is a web security vulnerability that occurs when a web application does not properly enforce restrictions on what authenticated users can access or manipulate, allowing attackers to gain unauthorized access to sensitive data or functionality. To prevent Broken Access Control, web developers must implement proper access control mechanisms, including authentication and authorization, and ensure that these controls are enforced consistently throughout the application.
* Insufficient Authorization and Authentication: Insufficient Authorization and Authentication refer to a range of security issues related to ensuring that users are properly authenticated and authorized to access sensitive data or functionality. A lack of strong authentication systems and authorization policies can result in unauthorized access to critical resources and data.

### Input Validation and Sanitization

Attackers can exploit a website by submitting malicious input through forms, such as SQL injection attacks or Cross-site scripting (XSS) attacks. By validating all user input and sanitizing it (removing any potentially dangerous characters), you can prevent these types of attacks.

* SQL Injection: Injection attacks occur when an attacker sends malicious code or commands to a web application with the goal of tricking the application into executing unintended actions, which can lead to data theft and other security issues. To prevent injection attacks, it is important to use input validation and sanitization techniques to ensure that user input is properly filtered and sanitized before being processed by the application.
* Cross-Site Scripting (XSS)
  * Purpose: Cross-Site Scripting (XSS) is a web security vulnerability that allows attackers to inject malicious code into a website viewed by other users, potentially allowing them to steal sensitive data or take control of user accounts.
  * Theory: Preventing XSS attacks involves proper input validation and sanitization, as well as implementing measures such as Content Security Policy (CSP) to limit the types of content that can be loaded by a website.
  * Solution: (TBC)
* Cross-Site Request Forgery (CSRF)
  * Purpose: Cross-Site Request Forgery (CSRF) attacks trick users into performing actions on a website without their knowledge or consent, by exploiting the trust relationship between the user and the website
  * Theory: To prevent CSRF attacks, web developers should implement anti-CSRF measures such as using CSRF tokens attached to each request and checking HTTP Referer headers to ensure that the request is coming from the allowed site.
  * Solution: 
    * Synchronizer Token Pattern: This method adds a unique token to each HTTP request, which the server then verifies before processing the request.
    * Same-Site Cookies: This method sets the SameSite attribute of a cookie, which tells the browser to only send the cookie with requests made on the same website.
    * Double Submit Cookies: This method adds a unique token to both the cookie and the form data, and then verifies that they match on the server.
    * Recaptcha v3
    * Use of frameworks that have built-in CSRF protection mechanisms.

### Secure Connections and Encryption

Encryption of data transmitted between the client and server using [HTTPS]({{site.baseurl}}/internet/2021/03/29/internet.html) is crucial for maintaining the confidentiality and integrity of sensitive information, as it prevents unauthorized access and interception by attackers who may attempt to eavesdrop on the communication. Proper implementation of strong encryption methods and certificates is necessary to establish a secure connection and prevent man-in-the-middle attacks.
* Security Misconfiguration: Security Misconfiguration is a web security vulnerability that occurs when web servers, applications, and frameworks are not properly configured, potentially exposing sensitive information or functionality to attackers. To prevent Security Misconfiguration, web developers must follow secure configuration practices, such as regularly updating software, disabling unnecessary services, and properly securing database connections and credentials.
* Sensitive Data Exposure: Sensitive Data Exposure is a web security vulnerability that occurs when sensitive information, such as passwords, credit card numbers, and personal data, is exposed through inadequate encryption or storage practices, potentially allowing attackers to steal or misuse this information. To prevent Sensitive Data Exposure, web developers must implement proper encryption and storage mechanisms for sensitive data, such as using secure hashing algorithms and storing data in secure, encrypted databases.
* Insufficient Logging and Monitoring: Insufficient Logging and Monitoring refers to a web security issue where there is a lack of proper logging and monitoring, making it difficult to detect and respond to security incidents. To prevent Insufficient Logging and Monitoring, web developers should implement comprehensive logging and monitoring systems that can detect and alert on potential security incidents, and have proper incident response procedures in place.

### injection flaws

injection flaws: Attacks server side. Attacker injects SQL commands to a webpage through legal inputs and server runs it and get sick; for example, remove data stored in database.

```javascript
to be continued
```

### cross site scripting (XSS)

to be continued, going to show how to do XSS

### Broken Access Control

to be continued

### Security Misconfiguration

to be continued

### Sensitive Data Exposure

to be continued

### Insufficient Logging and Monitoring

to be continued

### Insufficient Authorization and Authentication

insecure direct object reference: Attackers can get information by changing parameters sent to server. To solve it, we use session in cookie to store currently logged-in user and only response the data related to this user.

## What?

### CORS

CORS (Cross-Origin Resource Sharing) is a web security mechanism that allows controlled access to resources from different origins, ensuring secure and restricted communication between web applications.

It prevents

* Cross-Site Scripting (XSS): CORS does not directly prevent XSS attacks, but by enforcing CORS restrictions on cross-origin requests, it limits the access of malicious scripts injected through XSS attacks to resources on other origins, preventing unauthorized requests to sensitive APIs and interactions with resources on different origins.
* Cross-Site Request Forgery (CSRF): CORS can serve as an additional layer of defense against CSRF attacks by restricting cross-origin requests to trusted origins through proper CORS headers, making it more difficult for attackers to exploit CSRF vulnerabilities and execute unauthorized actions on behalf of users.
* Unauthorized Access to Resources: It helps ensure that sensitive APIs or resources are accessible only to specific trusted origins, mitigating the risk of unauthorized access and data leakage.
* Information Leakage: By restricting cross-origin requests to specific origins, CORS helps prevent sensitive information, such as cookies or authentication tokens, from being exposed to unauthorized domains.
* Clickjacking: CORS can help protect against clickjacking attacks by allowing web pages to define an appropriate X-Frame-Options header. This header specifies whether the page can be displayed within an iframe on another origin. By using CORS-related headers, web developers can restrict the embedding of their pages, reducing the risk of clickjacking attacks.

* [rails CORS]()
* [node CORS]({{site.baseurl}}/node/2023/02/13/web-security.html)

## Reference

[OWASP十大網路應用系統安全弱點說明](https://www.gss.com.tw/eis/59-eis48/290-owasp-top10)

[SSL, TLS, HTTP, HTTPS Explained](https://www.youtube.com/watch?v=hExRDVZHhig)

[Cross-Site Scripting (XSS) Explained](https://www.youtube.com/watch?v=EoaDgUgS6QA)

[2017 OWASP Top 10: Injection Attacks](https://www.youtube.com/watch?v=rWHvp7rUka8)

[React CSRF Protection Guide: Examples and How to Enable It](https://www.stackhawk.com/blog/react-csrf-protection-guide-examples-and-how-to-enable-it/)

[With anonymous cookies](https://security.stackexchange.com/questions/59411/how-to-protect-against-login-csrf)

[Registration and Login with JWT Authentication Tutorial - NodeJS Tutorial](https://www.youtube.com/watch?v=b9WlsQMGWMQ)
