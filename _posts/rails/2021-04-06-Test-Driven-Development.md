---
layout: post
title: (Rails 13) Test Driven Development
description: Taiwan only
date: '2021-04-06T12:13:45.562Z'
states: unmodified
categories: rails
---

## Introduction

Test Driven Development (TDD) is a kind of software development process, writing test first and then testing the software until all required function developed.

## Why?

TDD reduces bugs and increase the quality of code, making software to be more maintainable and understandable. With no test, there would be more manual test in the future and it will be hard to update the version.

## How?

I am going to use the following [self-built project](https://github.com/YCChenVictor/marketplace) as example and the tools are RSpec and Capybara.

### Add Gem File

In Gemfile, add

```
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw] 
  # 
  gem 'rspec-rails'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
end
```

### The Different Types of Specification And The Frequency of Testing

1.  Model specs — **always**
2.  System specs/feature specs — **always**
3.  Request specs/controller specs — **rarely**
4.  Helper specs — **rarely**
5.  View specs — **never**
6.  Routing specs — **never**
7.  Mailer specs — **never**
8.  Job specs — **never**

### Try to Describe The Process That A User going to do

The main goal for a website lands on how users feel, meaning if the user like it, then a good product born. As a result, the test should be focused on the user experience, meaning we should write the test for each function that a user may use. Consequently, the first task is to break the website into multiple unit that users are going to use.

In my example, the user is going to do following things to get what they want.

1.  users can login to the website and if user cannot login, then user can sign up successfully
2.  for buyer, browse the website to find what they want
3.  for seller, add product
4.  the buyer should be warranted that he will get the product
5.  the seller should be warranted that he will get the money

### Generate Specification

In terminal,

```
$ rails g rspec:system user_login
```

Then it will produce a file (spec/system/user_login_spec.rb) with following code:
```
require 'rails_helper'

RSpec.describe "UserLogins", type: :system do  
  before do  
    driven_by(:rack_test)  
  end

  pending "add some scenarios (or delete) #{__FILE__}"  
end
```
Then we can start to build spec.

### AAA principle (Arrange -> Act -> Assert)

> The basic principle to build spec is AAA principle.

> **arrange:** describe the environment before action begin

> **act:** execute the unit function that we want to test

> **assert:** check whether the result is what we want

For example, a woodcutter go into a forest (**arrange** the environment) -> the woodcutter use the axe to cut the wood (**act** the function) -> and the woodcutter should get the woods (**assert** the result). If the woodcutter does not like the result, woodcutter should modify the axe.

#### AAA principle maps spec:
```
RSpec.describe "the_summary", type: :feature do

  context "arrange" do
    it "assertion" do
      "arrange"
    end
  end
end
```

### What?

#### E**xample (BDD)**

For feature 1 above, the test should be **as follow:**

User goes to the login page (**arrange**) -> Enter email and password and then click login button (**act**) -> the webpage redirect to the webpage user clicked before (**assert**)

In spec/system/user_logins_spec.rb:
```
require 'rails_helper.rb'

RSpec.describe "the signin process", type: :feature do  
    
  before :each do  
    User.create(email: '[user@example.com](mailto:user@example.com)', password: 'password')  
  end

  it "signs me in" do  
      visit '/users/sign_in'  
      fill_in "user_email", with: '[user@example.com](mailto:user@example.com)'  
      fill_in "user_password", with: 'password'  
      click_button 'Log in'  
      expect(page).to have_content 'Signed in successfully.'  
    end
  end  
end
```
### Run it

Then run the specification,

#### Default: Run all spec files (i.e., those matching spec/**/*_spec.rb)  
```
$ bundle exec rspec 
```
#### Run all spec files in a single directory (recursively)  
```
$ bundle exec rspec spec/models
```

#### Other Example (TDD) **Account Balance Specification**

If we want to build an account system which can save, withdraw, reveal balance.

Before starting, we should write down the specification:

* save: 
1. If there is 10 dollars already in the account, after adding 5 dollars, the balance would be 15. 
2. If there is 10 dollars, after adding -5 dollars, the balance is still 10, meaning the amount of dollar cannot be negative.

* withdraw: 
1. If there is 10 dollars already in the account, after withdrawing 5 dollars, the balance would be 5. 
2. If there is 10 dollars already in the account and trying to withdraw 20 dollars, the balance is still 10 dollars.
3. If there is 10 dollars, after withdrawing -5 dollar, the balance is still 10 dollars.

### Install RSpec
```
$ gem install rspec
```
### Write the test file

Turn specification into test file, bank_account_spec.rb
```
RSpec.describe BankAccount do  
    
  describe "save function" do  
    it "If there is 10 dollars already in the account, after adding 5 dollars, the balance would be 15"  
    it "If there is 10 dollars, after adding -5 dollars, the balance is still 10. meaning the amount of dollar cannot be negative"  
  end  
    
  describe "withdraw function" do  
    it "If there is 10 dollars already in the account, after withdrawing 5 dollars, the balance would be 5"  
    it "If there is 10 dollars already in the account and trying to withdraw 20 dollars, the balance is still 10 dollars"  
    it "If there is 10 dollars, after withdrawing -5 dollar, the balance is still 10 dollars"  
  end  
end
```
### Use a test

Then we can use the test, bank_account_spec.rb
```
$ rspec bank_account_spec.rb
```
error:
<img src="/assets/img/1__iJwOlbAmm6WbzezhIlHXbg.png" alt="">

which means there is no BankAccout. Then create one, `./bank_account.rb` :
```
class BankAccount
end
```
and add
```
require "./bank_account"
```
to the first line of `bank_account_spec.rb`

Then do the testing again:
```
$ rspec bank_account_spec.rb
```
The following message pops up
<img src="/assets/img/1__XsUeZLKOoNJENyU0aT5w6w.png" alt="">
![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__XsUeZLKOoNJENyU0aT5w6w.png)

There are 5 pending test going to be added.

\* means pending, . means success, and F means failure. The first line is ***** meaning there are 5 test pending.

Then we should continue to build test. In `bank_account_spec.rb`
```
require "./bank_account"

RSpec.describe BankAccount do  
  describe "save function" do  
    it "If there is 10 dollars already in the account, after adding 5 dollars, the balance would be 15" do  
      account = BankAccount.new(10)  
      account.deposit 5  
      expect(account.balance).to be 15  
    end

    it "If there is 10 dollars, after adding -5 dollars, the balance is still 10. meaning the amount of dollar cannot be negative"  
  end

  describe "withdraw function" do  
  end  
end
```
Notice, there are three method added: `new, deposit, balance` which is going to be added. Let’s run the test first:
```
$ rspec bank_account_spec.rb
```
Except 4 pendings, we can see 1 failure with errors such as no initialize and no new method
<img src="/assets/img/1__2Ef4pd2u__b3lccQP54G3KA.png" alt="">

Then let’s add the methods. In `./bank_account.rb` :
```
class BankAccount  
    
  def initialize(amount)  
    @amount = amount  
  end

  def balance  
    @amount = amount  
  end

  def deposit(amount)  
    @amount += amount  
  end

end
```
Then rum the test again:
<img src="/assets/img/1__svumF__piK__Zja4I7AOaUcQ.png" alt="">

The failure disappears and there are still 4 pendings.

Then keep creating methods in test file and keep the pending and failures disappear.

#### Other Example (TDD) **rspec, factory bot, faker, shoulda-matchers** (可以用 row leg 的專案)
 
### Reference

[**Learn TDD in Rails Learn TDD**](https://learntdd.in/rails/)

[**Ruby on Rails 實戰聖經**](https://ihower.tw/rails/testing.html)

[https://en.wikipedia.org/wiki/Test-driven_development](https://en.wikipedia.org/wiki/Test-driven_development)

[**Hello Testing - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天**](https://ithelp.ithome.com.tw/articles/10185338)

[**What are the different kinds of Rails tests and when should I use each? - Code with Jason**](https://www.codewithjason.com/different-kinds-rails-tests-use/)

[**teamcapybara/capybara**](https://github.com/teamcapybara/capybara#using-capybara-with-rspec)

[**rspec/rspec-rails**](https://github.com/rspec/rspec-rails)