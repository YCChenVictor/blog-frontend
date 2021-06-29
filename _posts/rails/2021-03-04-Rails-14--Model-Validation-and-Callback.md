---
layout: post
title: (Rails_14) Model Validation and Callback
date: '2021-03-04'
categories: rails
note: 
---

## Validation

To prevent any malfunction in database, usually we do validation while data inserting.

There are three possible approaches for validation:

1.  frontend: validating data using javascript for user to input data
2.  backend: after data sending to server, before inserting to database, validate it
3.  database: validate it with database functions

While frontend validation is easiest, if users turn off javascript or scripting HTML source code, it can still be inserted into database

Written validation in database may cause problem once apps change their database system.

As a result, in the backend world, controller or model would be much more appropriate way to do validation. Comparing to controller, model would be more appropriate because we should let controller only control methods.

## Validation in Model

For example, if we want every title of an article must be written while data inserting, then the Model, `Article` :
```
class Article < ApplicationRecord  
  validates :title, presence: true  
end
```
After migration, in rails console,
```
a1 = Article.new  
a1.save
```
There would be error pops up

<img src="/assets/img//1__zKw5dFtttxNPnjIC22Y6TQ.png" alt="">

Then we can check the error message with
```
a1.errors.full_messages
```
It means we must assign title while creating data.

<img src="/assets/img//1__nI1t__NAXWIweoRiZM8jWRA.png" alt="">

### Not all method will be validated in model

for example, the methods: create, create!, save, save!, update, update!

### Create customized validator (這還沒自己測試過)

For example, if we want the article title to start with Ruby,

In model, Article, add a method after validates such as
```
class Article < ApplicationRecord  
  validates :title, presence: true, begin_with_ruby: true  
end
```
Then define the method, begin_with_ruby, in the save file of class, Article
```
class BeginWithRubyValidator < ActiveModel::EachValidator  
  def validate_each(record, attribute, value)  
    unless value.start_with? 'Ruby'  
      record.errors.add attribute, (options[:message] || "Should Start with Ruby")  
    end  
  end  
end
```
### Model Callback

Callback means adding some methods (hooks) to the life cycle of data in database.

For example, the process of save in rails:
<img src="/assets/img/rails_model_callback.png" alt="">

If we want to have an encrypted email before email creation. Then,
```
require 'digest'

class User < ActiveRecord::Base  
  before_create :encrypt_email  
    
  private  
  def encrypt_email  
    self.email = Digest::MD5.hexdigest(email)  
  end  
end
```
for more callback methods, please refer to [**Active Record Callbacks - Ruby on Rails Guides**]("https://guides.rubyonrails.org/active_record_callbacks.html")

### Reference

[**為你自己學 Ruby on Rails 高見龍**]("https://railsbook.tw/")

[**Active Record Validations - Ruby on Rails Guides**]("https://guides.rubyonrails.org/active_record_validations.html")

[**Active Record Callbacks - Ruby on Rails Guides**]("https://guides.rubyonrails.org/active_record_callbacks.html")
