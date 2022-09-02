---
layout: post
title:
description: ''
date: '2022-08-31'
categories: test
note: 這邊的方法論太玄了，直接先寫個例子在 what，類似的例子在 commit 595b287
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

quick explanation

## Why?

focus on why we need it

## How?

focus on the mechanim

## What?

I am going to demonstrate BDD with RSpec and Capybara to develop user login functions.

-
-I am going to use the following [self-built project](https://github.com/YCChenVictor/marketplace) as example and the tools are RSpec and Capybara.
-
-### Add Gem File
-
-In Gemfile, add
-
-```ruby
-group :development, :test do
-  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
-  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
-  #
-  gem 'rspec-rails'
-end
-
-group :test do
-  gem 'capybara'
-  gem 'selenium-webdriver'
-end
-```
-
-### The Different Types of Specification And The Frequency of Testing
-
-1. Model specs — **always**
-2. System specs/feature specs — **always**
-3. Request specs/controller specs — **rarely**
-4. Helper specs — **rarely**
-5. View specs — **never**
-6. Routing specs — **never**
-7. Mailer specs — **never**
-8. Job specs — **never**
-
-### Try to Describe The Process That A User going to do
-
-The main goal for a website lands on how users feel, meaning if the user like it, then a good product born. As a result, the test should be focused on the user experience, meani
ng we should write the test for each function that a user may use. Consequently, the first task is to break the website into multiple unit that users are going to use.
-
-In my example, the user is going to do following things to get what they want.
-
-1. users can login to the website and if user cannot login, then user can sign up successfully
-2. for buyer, browse the website to find what they want
-3. for seller, add product
-4. the buyer should be warranted that he will get the product
-5. the seller should be warranted that he will get the money
-
-### Generate Specification
-
-In terminal,
-
-```bash
-rails g rspec:system user_login
-```
-
-Then it will produce a file (spec/system/user_login_spec.rb) with following code:
-
-```ruby
-require 'rails_helper'
-
-RSpec.describe "UserLogins", type: :system do
-  before do
-    driven_by(:rack_test)
-  end
-
-  pending "add some scenarios (or delete) #{__FILE__}"
-end
-```
-
-Then we can start to build spec.
-
-### AAA principle (Arrange -> Act -> Assert)
-
-> The basic principle to build spec is AAA principle.
-> **arrange:** describe the environment before action begin
-> **act:** execute the unit function that we want to test
-> **assert:** check whether the result is what we want
-
-For example, a woodcutter go into a forest (**arrange** the environment) -> the woodcutter use the axe to cut the wood (**act** the function) -> and the woodcutter should get th
e woods (**assert** the result). If the woodcutter does not like the result, woodcutter should modify the axe.
-
-#### AAA principle maps spec
-
-```ruby
-RSpec.describe "the_summary", type: :feature do
-
-  context "arrange" do
-    it "assertion" do
-      "act"
-    end
-  end
-end
-```
-
-### What?
-
-#### Example of BDD
-
-For feature 1 above, the test should be as follow:
-
-User goes to the login page (**arrange**) -> Enter email and password and then click login button (**act**) -> the webpage redirect to the webpage user clicked before (**assert*
*)
-
-In spec/system/user_logins_spec.rb:
-
-```ruby
-require 'rails_helper.rb'
-
-RSpec.describe "the signin process", type: :feature do
-
-  before :each do
-    User.create(email: '[user@example.com](mailto:user@example.com)', password: 'password')
-  end
-
-  context "arrange" do
-    it "signs me in" do
-      visit '/users/sign_in'
-      fill_in "user_email", with: '[user@example.com](mailto:user@example.com)'
-      fill_in "user_password", with: 'password'
-      click_button 'Log in'
-      expect(page).to have_content 'Signed in successfully.'
-    end
-  end
-end
-```
-
-### Run it
-
-Then run the specification,
-
-#### Default: Run all spec files (i.e., those matching spec/**/*_spec.rb)
-```
-$ bundle exec rspec
-```
-#### Run all spec files in a single directory (recursively)
-```
-$ bundle exec rspec spec/models
-```
-

-### What?
-
-#### Example of BDD
-
-For feature 1 above, the test should be as follow:
-
-User goes to the login page (**arrange**) -> Enter email and password and then click login button (**act**) -> the webpage redirect to the webpage user clicked before (**assert*
*)
-
-In spec/system/user_logins_spec.rb:
-
-```ruby
-require 'rails_helper.rb'
-
-RSpec.describe "the signin process", type: :feature do
-
-  before :each do
-    User.create(email: '[user@example.com](mailto:user@example.com)', password: 'password')
-  end
-
-  context "arrange" do
-    it "signs me in" do
-      visit '/users/sign_in'
-      fill_in "user_email", with: '[user@example.com](mailto:user@example.com)'
-      fill_in "user_password", with: 'password'
-      click_button 'Log in'
-      expect(page).to have_content 'Signed in successfully.'
-    end
-  end
-end
-```
-
-### Run it
-
-Then run the specification,
-
-#### Default: Run all spec files (i.e., those matching spec/**/*_spec.rb)
-```
-$ bundle exec rspec
-```
-#### Run all spec files in a single directory (recursively)
-```
-$ bundle exec rspec spec/models

## Reference

[What is Integration Testing? Software Testing Tutorial](https://www.youtube.com/watch?v=QYCaaNz8emY)

[Integration Testing Ruby on Rails with Minitest and Capybara](https://semaphoreci.com/community/tutorials/integration-testing-ruby-on-rails-with-minitest-and-capybara)
