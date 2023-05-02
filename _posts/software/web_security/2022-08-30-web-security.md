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

* Authentication and Authorization: Ensuring that only authenticated and authorized users can access the sensitive parts of your website or application is critical. A strong authentication system that verifies user credentials and authorization policies that determine what users can and cannot access is essential to maintain security.
  * Broken Authentication and Session Management: This covers a range of security issues related to user authentication and session management, including weak passwords, session hijacking, and broken logout functionality.
  * Broken Access Control: Broken Access Control is a web security vulnerability that occurs when a web application does not properly enforce restrictions on what authenticated users can access or manipulate, allowing attackers to gain unauthorized access to sensitive data or functionality. To prevent Broken Access Control, web developers must implement proper access control mechanisms, including authentication and authorization, and ensure that these controls are enforced consistently throughout the application.
  * Insufficient Authorization and Authentication: Insufficient Authorization and Authentication refer to a range of security issues related to ensuring that users are properly authenticated and authorized to access sensitive data or functionality. A lack of strong authentication systems and authorization policies can result in unauthorized access to critical resources and data.
* Input Validation and Sanitization: Attackers can exploit a website by submitting malicious input through forms, such as SQL injection attacks or Cross-site scripting (XSS) attacks. By validating all user input and sanitizing it (removing any potentially dangerous characters), you can prevent these types of attacks.
  * Injection: Injection attacks occur when an attacker sends malicious code or commands to a web application with the goal of tricking the application into executing unintended actions, which can lead to data theft and other security issues. To prevent injection attacks, it is important to use input validation and sanitization techniques to ensure that user input is properly filtered and sanitized before being processed by the application.
  * Cross-Site Scripting (XSS): Cross-Site Scripting (XSS) is a web security vulnerability that allows attackers to inject malicious code into a website viewed by other users, potentially allowing them to steal sensitive data or take control of user accounts. Preventing XSS attacks involves proper input validation and sanitization, as well as implementing measures such as Content Security Policy (CSP) to limit the types of content that can be loaded by a website.
  * Cross-Site Request Forgery (CSRF): Cross-Site Request Forgery (CSRF) attacks trick users into performing actions on a website without their knowledge or consent, by exploiting the trust relationship between the user and the website. To prevent CSRF attacks, web developers should implement anti-CSRF measures such as using CSRF tokens and checking HTTP Referer headers.
  * Using Components with Known Vulnerabilities: Using Components with Known Vulnerabilities refers to the practice of incorporating third-party components, such as libraries and frameworks, that have known security vulnerabilities, and can be exploited by attackers to compromise the security of a website or application. To mitigate this risk, web developers should keep track of the security vulnerabilities of the components they use, and update them regularly to the latest, more secure version.
* Secure Connections and Encryption: Encryption of data transmitted between the client and server using [HTTPS]({{site.baseurl}}/internet/2021/03/29/internet.html) is crucial for maintaining the confidentiality and integrity of sensitive information, as it prevents unauthorized access and interception by attackers who may attempt to eavesdrop on the communication. Proper implementation of strong encryption methods and certificates is necessary to establish a secure connection and prevent man-in-the-middle attacks.
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

### Cross Site Request Forgery (CSRF)

CSRF is a type of attack that allows a malicious website to perform actions on behalf of a user who is logged into a different website. For example, an attacker could trick a user into clicking a link that submits a form to their bank's website, transferring money to the attacker's account. To prevent CSRF attacks, web applications often use a token that is attached to each form submission and checked on the server to ensure that the request is coming from the same site that generated the form.

Attackers can hide malware in seeable places for logged-in users, who have sessions and is authenticated, to click it and then sent unwanted requests to server with the session in cookie.

Solutions:

* Synchronizer Token Pattern: This method adds a unique token to each HTTP request, which the server then verifies before processing the request.
* Same-Site Cookies: This method sets the SameSite attribute of a cookie, which tells the browser to only send the cookie with requests made on the same website.
* Double Submit Cookies: This method adds a unique token to both the cookie and the form data, and then verifies that they match on the server.
* Recaptcha v3
* Use of frameworks that have built-in CSRF protection mechanisms.

### Insufficient Authorization and Authentication

insecure direct object reference: Attackers can get information by changing parameters sent to server. To solve it, we use session in cookie to store currently logged-in user and only response the data related to this user.

## What?

### XSS

solve it with CORS

CORS helps to prevent cross-site scripting (XSS) attacks and provides a secure mechanism for sharing resources between different domains. Without CORS, a web application running on one domain would not be able to access resources or data on another domain, even if the user has authorized the request. This can limit the functionality and interoperability of web applications and prevent the sharing of data between sites.

### CSRF

I want to use the [concept of JWT]({{site.baseurl}}/api/2022/08/17/authentication.html#jwt) because JWT check token on each request, which naturally prevent CSRF. However, it may encounter XSS because now the token is accessible on frontend. But react itself can prevent it.

With the JWT design, we can disable CORS checks as follow in node

```javascript
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
```

## Reference

[OWASP十大網路應用系統安全弱點說明](https://www.gss.com.tw/eis/59-eis48/290-owasp-top10)

[SSL, TLS, HTTP, HTTPS Explained](https://www.youtube.com/watch?v=hExRDVZHhig)

[Cross-Site Scripting (XSS) Explained](https://www.youtube.com/watch?v=EoaDgUgS6QA)

[2017 OWASP Top 10: Injection Attacks](https://www.youtube.com/watch?v=rWHvp7rUka8)

[React CSRF Protection Guide: Examples and How to Enable It](https://www.stackhawk.com/blog/react-csrf-protection-guide-examples-and-how-to-enable-it/)

[With anonymous cookies](https://security.stackexchange.com/questions/59411/how-to-protect-against-login-csrf)

[Registration and Login with JWT Authentication Tutorial - NodeJS Tutorial](https://www.youtube.com/watch?v=b9WlsQMGWMQ)
