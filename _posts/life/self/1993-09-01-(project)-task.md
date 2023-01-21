---
layout: post
title:
description: ''
date: '1993-09-01'
categories:
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish:
---

## Introduction

This project decentralize the tasks.

## Why?

## How?

Two role: task giver and task receiver

* landing page
  * login mechanism
  * list out the tasks, each tasks should have a spec to test
  * button to create a task
* task acquirer can upload their masterpiece and try to pass the specs
* Once the specs complete, the transactions complete automatically by blockchain

## What?

### project

put official url

### postman

* new collection for task
* setup environment
* setup APIs

my localhost:

| variable | value |
| :--- | :--- |
| host | http://localhost:3000 |

my requests:

GET /
POST /sign_up
POST /login

### TODO

* try to connect Jenkins API to upload tests
* let user to create task with spec
* add frontend to post API login
* add bcrypt for password
* add JWT mechanism to do session
* let user to upload commit to pass spec
* connect blockchain for contract, once the commit pass spec, they get money
* connect chatGPT to create spec and solution for us
* add mock database for jest
* after phase one, deploy it on fly

## Reference
