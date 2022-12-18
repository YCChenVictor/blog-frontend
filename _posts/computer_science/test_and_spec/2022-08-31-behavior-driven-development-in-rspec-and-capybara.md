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

### AAA principle (Arrange -> Act -> Assert)

The basic principle to build spec is AAA principle.
**arrange:** describe the environment before action begin
**act:** execute the unit function that we want to test
**assert:** check whether the result is what we want

* AAA principle maps spec

```ruby
RSpec.describe "the_summary", type: :feature do

  context "arrange" do
    it "assertion" do
      "act"
    end
  end
end
```

## What?

I am going to demonstrate BDD with RSpec and Capybara to develop user login functions.

Steps:

* install required gems
* describe user story
* compose specification
* build feature

### install required gems

Create rails app by

```bash
rails new app
```

In gemfile,

```ruby
group :development, :test do
  gem 'rspec-rails'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
end
```

Run

```bash
bundle install
```

### describe user story

Again we can use AAA principle to compose spec

User goes to the login page (**arrange**) -> Enter email and password and then click login button (**act**) -> the webpage redirect to the webpage user clicked before (**assert**)

### Compose Specification

Generate spec through

```bash
rails g rspec:feature user_login
```

to produce `spec/feature/user_login_spec.rb` and input

```ruby
require 'spec_helper'

RSpec.describe "user signin", type: :feature do
  before :each do
    User.create(email: 'user@example.com', password: 'password')
  end

  context "after user on sign in page" do
    before do
      visit '/users/sign_in'
    end

    it "signs user in" do
      fill_in "user_email", with: 'user@example.com'
      fill_in "user_password", with: 'password'
      click_button 'Log in'
      expect(page).to have_content 'Signed in successfully.'
    end
  end
end
```

### build feature

run all spec with `bundle exec rspec` or specific spec with `bundle exec rspec spec/features/user_login_spec.rb` and keep building the features until no errors pop up.

## Reference

[What is Integration Testing? Software Testing Tutorial](https://www.youtube.com/watch?v=QYCaaNz8emY)

[Integration Testing Ruby on Rails with Minitest and Capybara](https://semaphoreci.com/community/tutorials/integration-testing-ruby-on-rails-with-minitest-and-capybara)

[Generators](https://relishapp.com/rspec/rspec-rails/docs/generators)
