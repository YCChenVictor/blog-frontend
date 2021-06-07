---
title: (Rails_14) Model Validation and Callback
description: ''
date: '2021-03-04T05:47:12.449Z'
categories: []
keywords: []
slug: /@t5204713910/rails-14-model-validation-and-callback-692e7c79818
---

### Validation

To prevent any malfunction in database, usually we do validation while data inserting.

There are three possible approaches for validation:

1.  frontend: validating data when HTML using javascript for user to input data
2.  backend: after data sending to server, before inserting to database, validate it with apps
3.  database: validate it with database functions

While frontend validation is easiest, if users turn off javascript or scripting HTML source code, it can still be inserted into database

Written validation in database may cause problem once apps change their database system.

As a result, in the backend world, controller or model would be much more appropriate way to do validation. Comparing to controller, model would be more appropriate because there are already many methods in controllers.

### Validation in Model

For example, if we want every article’s title must be written when data inserting, then the Model, `Article` :

class Article < ApplicationRecord  
  validates :title, presence: true  
end

After migration, in rails console,

a1 = Article.new  
a1.save

There would be error pops up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__zKw5dFtttxNPnjIC22Y6TQ.png)

Then we can check the error message with

a1.errors.full\_messages

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__nI1t__NAXWIweoRiZM8jWRA.png)

#### Not all method will be validated in model

for example, the methods: create, create!, save, save!, update, update!

#### Create customized validator (unsolved problem exists)

For example, if we want the article title to start with Ruby,

In model, Article, add a method after validates such as

class Article < ApplicationRecord  
  validates :title, presence: true, begin\_with\_ruby: true  
end

Then define the method, begin\_with\_ruby, in the save file of class, Article

class BeginWithRubyValidator < ActiveModel::EachValidator  
  def validate\_each(record, attribute, value)  
    unless value.start\_with? 'Ruby'  
      record.errors.add attribute, (options\[:message\] || "Should Start with Ruby")  
    end  
  end  
end

### Model Callback

Callback means adding some method to the process of manipulating database.

For example, the process of save in rails:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__mYNt1Ggyd7edMv2Oa7O4mw.png)

If we want to have an encrypted email before email creation. Then,

require 'digest'

class User < ActiveRecord::Base  
  before\_create :encrypt\_email  
    
  private  
  def encrypt\_email  
    self.email = Digest::MD5.hexdigest(email)  
  end  
end

### Reference

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)

[**Active Record Validations - Ruby on Rails Guides**  
_Active Record ValidationsThis guide teaches you how to validate the state of objects before they go into the database…_guides.rubyonrails.org](https://guides.rubyonrails.org/active_record_validations.html "https://guides.rubyonrails.org/active_record_validations.html")[](https://guides.rubyonrails.org/active_record_validations.html)