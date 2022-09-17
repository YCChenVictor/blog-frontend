---
layout: post
title:
date: '2021-03-04'
categories: rails
note: 
publish: true
---

## Introduction

This article describes the concept of validation in model of rails.

Types of validation:

* frontend: validate with javascript when user input data
* backend: after data sending to server, before inserting to database, validate it
* database: validation in database

## Why

To prevent any malfunction in database, we do validation while data inserting.

## How

Actually the code is pretty straight forward. It will slice the attributes and loop through them to validate with validators.

```ruby
# File activemodel/lib/active_model/validations/validates.rb, line 105
def validates(*attributes)
  defaults = attributes.extract_options!.dup
  validations = defaults.slice!(*_validates_default_keys)

  raise ArgumentError, "You need to supply at least one attribute" if attributes.empty?
  raise ArgumentError, "You need to supply at least one validation" if validations.empty?

  defaults[:attributes] = attributes

  validations.each do |key, options|
    next unless options
    key = "#{key.to_s.camelize}Validator"

    begin
      validator = key.include?("::".freeze) ? key.constantize : const_get(key)
    rescue NameError
      raise ArgumentError, "Unknown validator: '#{key}'"
    end

    validates_with(validator, defaults.merge(_parse_validates_options(options)))
  end
end
```

### skip validation

How rails design skip validations? TBC

### Not all method will be validated in model

for example, the methods: create, create!, save, save!, update, update!

### customized validator

TBC

## What

### example

For example, title is required in articles:

```ruby
class Article < ApplicationRecord  
  validates :title, presence: true  
end
```

After migration, in rails console,

```ruby
a1 = Article.new  
a1.save
```

Then

<img class='w-1/3' src="/assets/img//1__zKw5dFtttxNPnjIC22Y6TQ.png" alt="">

Then we can check the error message with

```ruby
a1.errors.full_messages
```

It means we must assign title while creating article.

<img class='w-1/2' src="/assets/img//1__nI1t__NAXWIweoRiZM8jWRA.png" alt="">

### example: customized validator

TBC

For example, if we want the article title to start with `ruby`,

In model, `Article`, add a method after validates such as

```ruby
class Article < ApplicationRecord  
  validates :title, presence: true, begin_with_ruby: true  
end
```

Then define the method, `begin_with_ruby`, in the save file of class, Article

```ruby
class BeginWithRubyValidator < ActiveModel::EachValidator  
  def validate_each(record, attribute, value)  
    unless value.start_with? 'Ruby'  
      record.errors.add attribute, (options[:message] || "Should Start with Ruby")  
    end  
  end  
end
```

### Reference

[為你自己學 Ruby on Rails 高見龍]("https://railsbook.tw/")

[Active Record Validations - Ruby on Rails Guides]("https://guides.rubyonrails.org/active_record_validations.html")

[Active Record Callbacks - Ruby on Rails Guides]("https://guides.rubyonrails.org/active_record_callbacks.html")

[validates](https://apidock.com/rails/ActiveModel/Validations/ClassMethods/validates)
