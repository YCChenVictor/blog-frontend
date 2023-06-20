---
layout: post
title:
description: ''
date: '2022-09-02'
categories: test
note: 我覺得 testing 這邊太亂了，應該從例子出發
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

(2023/06/19)

This article tries to clarify the concepts related to test

## Why?

Tests can prevent bugs earlier.

## How?

### concept of testing

Add pyramid to demo the decomposition of tests end-to-end -> integration -> unit (TBC)

The end goal of testing is to make sure users have good experience, so before users use our app, we should let testers do what users will do in all scenarios and check whether the experience is acceptable. We call this kind of tests end-to-end test or quality assurance.

### AAA principle (Arrange -> Act -> Assert)

> The basic principle to build spec is AAA principle.
> **arrange:** describe the environment before action begin
> **act:** execute the unit function that we want to test
> **assert:** check whether the result is what we want

### integration testing

During the end-to-end testing, there must be some fix processes, and we can automize them with integration testing, which simulates the users behaviors on **browsers** and ensure the expect results.

### unit testing

Unit tests mainly ensures the input and output of each components such as code for database query, flows in controller, and the presentation on view, but it do not simulate the users' behaviors.

### functional testing

TBC

### test driven development

TDD maps to unit testing. We write unit test first and then develop software.

### behavior driven development

BDD maps to integration testing. We write feature test first and then develop software.

## What?

### TDD

TDD maps unit test. Refer to [TDD]({{site.baseurl}}/test/2021/04/06/TDD.html) for further information.

### BDD

BDD maps integration test maps capybara + Rspec. Refer to 2022-08-31-behavior-driven-development-in-rspec-and-capybara.md.

## Reference

[What is Software Testing? Definition](https://www.guru99.com/software-testing-introduction-importance.html)

[Testing Pyramid : How to jumpstart Test Automation](https://www.browserstack.com/guide/testing-pyramid-for-test-automation)
