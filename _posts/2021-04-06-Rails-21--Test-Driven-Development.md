---
title: (Rails_21) Test Driven Development
description: 'With Framework, RSpec and The Functions for Automation, Capybara and Selenium'
date: '2021-04-06T12:13:45.562Z'
categories: []
keywords: []
slug: /@t5204713910/rails-21-test-driven-development-524eb001bbeb
---

### Introduction

Test Driven Development (TDD) is a kind of software development process, writing test first and then testing the software until all required function developed.

### Why?

TDD reduces bugs and increase the quality of code, making software to be more maintainable and understandable.

### How?

I am going to use the following [self-built project](https://github.com/YCChenVictor/marketplace) as example and the tools are RSpec and Capybara.

#### Add Gem File

In Gemfile, add

```
group :development, :test do  # Call 'byebug' anywhere in the code to stop execution and get a debugger console  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
```

#### The Different Types of Specification And The Frequency of Testing

1.  Model specs — **always**
2.  System specs/feature specs — **always**
3.  Request specs/controller specs — **rarely**
4.  Helper specs — **rarely**
5.  View specs — **never**
6.  Routing specs — **never**
7.  Mailer specs — **never**
8.  Job specs — **never**

#### Try to Describe The Process That A User going to do

The main goal for a website lands on how users feel, meaning if the user like it, then a good product born. As a result, the test should be focused on the user experience, meaning we should write the test for each function that a user may use. Consequently, the first task is to break the website into multiple unit that users are going to use.

In my example, the user is going to do following things to get what they want.

1.  users can login to the website and if user cannot login, then user can sign up successfully
2.  for buyer, browse the website to find what they want
3.  for seller, add product
4.  the buyer should be warranted that he will get the product
5.  the seller should be warranted that he will get the money

#### Generate Specification

In terminal,

```
$ rails g rspec:system user_login
```

Then it will produce a file (spec/system/user\_login\_spec.rb) with following code:

require 'rails\_helper'

RSpec.describe "UserLogins", type: :system do  
  before do  
    driven\_by(:rack\_test)  
  end

  pending "add some scenarios (or delete) #{\_\_FILE\_\_}"  
end

Then we can start to build spec.

#### AAA principle (Arrange -> Act -> Assert)

> The basic principle to build spec is AAA principle.

> **arrange:** describe the environment before action begin

> **act:** execute the unit function that we want to test

> **assert:** check whether the result is what we want

For example, a woodcutter go into a forest (**arrange** the environment) -> the woodcutter use the axe to cut the wood (**act** the function) -> and the woodcutter should get the woods (**assert** the result). If the woodcutter does not like the result, woodcutter should modify the axe.

### What?

#### E**xample**

For feature 1 above, the test should be **as follow:**

User goes to the login page (**arrange**) -> Enter email and password and then click login button (**act**) -> the webpage redirect to the webpage user clicked before (**assert**)

In spec/system/user\_logins\_spec.rb:

require 'rails\_helper.rb'

RSpec.describe "the signin process", type: :feature do  
    
  before :each do  
    User.create(email: '[user@example.com](mailto:user@example.com)', password: 'password')  
  end

it "signs me in" do  
    visit '/users/sign\_in'  
    fill\_in "user\_email", with: '[user@example.com](mailto:user@example.com)'  
    fill\_in "user\_password", with: 'password'  
    click\_button 'Log in'  
    expect(page).to have\_content 'Signed in successfully.'  
  end

end  
end

#### Run it

Then run the specification,

\# Default: Run all spec files (i.e., those matching spec/\*\*/\*\_spec.rb)  
$ bundle exec rspec  
  
\# Run all spec files in a single directory (recursively)  
$ bundle exec rspec spec/models

### Reference

[**Learn TDD in Rails | Learn TDD**  
_Test-Driven Development (TDD) is an approach to automated software testing that involves writing a failing test before…_learntdd.in](https://learntdd.in/rails/ "https://learntdd.in/rails/")[](https://learntdd.in/rails/)

[**Ruby on Rails 實戰聖經**  
_Developer testing isn't primarily about verifying code. It's about making great code. If you can't test something, it…_ihower.tw](https://ihower.tw/rails/testing.html "https://ihower.tw/rails/testing.html")[](https://ihower.tw/rails/testing.html)

[https://en.wikipedia.org/wiki/Test-driven\_development](https://en.wikipedia.org/wiki/Test-driven_development)

[**Hello Testing - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天**  
_今天開始會有比較多實際範例，但以 PHP 為主，其他語言可能需要切換一下。 如果依層級分類的話，相對最底層的 Testing 就稱之為 Unit Testing ，中文稱之為「單元測試」。…_ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/articles/10185338 "https://ithelp.ithome.com.tw/articles/10185338")[](https://ithelp.ithome.com.tw/articles/10185338)

[**What are the different kinds of Rails tests and when should I use each? - Code with Jason**  
_When starting out with Rails testing, it's hard to know where to start. First, there's the decision of which framework…_www.codewithjason.com](https://www.codewithjason.com/different-kinds-rails-tests-use/ "https://www.codewithjason.com/different-kinds-rails-tests-use/")[](https://www.codewithjason.com/different-kinds-rails-tests-use/)

[**teamcapybara/capybara**  
_Acceptance test framework for web applications. Contribute to teamcapybara/capybara development by creating an account…_github.com](https://github.com/teamcapybara/capybara#using-capybara-with-rspec "https://github.com/teamcapybara/capybara#using-capybara-with-rspec")[](https://github.com/teamcapybara/capybara#using-capybara-with-rspec)

[**rspec/rspec-rails**  
_rspec-rails brings the RSpec testing framework to Ruby on Rails as a drop-in alternative to its default testing…_github.com](https://github.com/rspec/rspec-rails "https://github.com/rspec/rspec-rails")[](https://github.com/rspec/rspec-rails)