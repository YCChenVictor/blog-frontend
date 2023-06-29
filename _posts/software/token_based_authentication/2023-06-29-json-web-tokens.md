---
layout: post
title:
description: ''
date: '2023-06-29'
categories: token_based_authentication
note:
mathjax:
mermaidJS:
p5JS:
chartJS:
threeJS:
publish: true
---

## Introduction

quick explanation

## Why?

focus on why we need it

## How?

JSON Web Tokens (JWT): JWT is a compact and self-contained token format that securely carries claims between parties, enabling authentication and authorization in a stateless manner.

JWT is a self-contained token that securely transmits information between parties as a JSON object. It consists of three parts: a header, a payload, and a signature.
* Header contains information about the token
* Payload contains the claims (user information, expiration time, etc.)
* Signature ensures the integrity of the token. The server validates the token's signature to verify its authenticity.

The steps of JWT:

1. Claims: JWT consists of a set of claims encoded as a JSON object. These claims can include information about the user, such as the user's name, ID, and roles.
2. Encoding: The JSON object is then Base64Url encoded to produce a compact string, which is the JWT.
3. Signature: To ensure that the information in the JWT has not been tampered with, a signature is generated using a secret key shared between the parties. The signature is calculated over the encoded JWT and is appended to it, separated by a period.
4. Transmission: The JWT is then sent from the client to the server in the **Authorization** header of an HTTP request, usually as a Bearer Token.
5. Verification: On the server, the signature is verified using the shared secret key, and if the signature is valid, the information in the JWT is trusted and can be used to perform authorized actions.

## What?

## Reference
