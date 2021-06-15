---
layout: post
title: (Rails_27) Sidekiq (Activejob)
description:
date: '2021-06-09'
categories: [rails]
note: none
---

### Introduction

Sidekiq lets project can deal with missions asynchronously, meaning the missions not in urgency can put on background and be done later; for example, after a user logging in successfully, we may want to send an email to notify the user. Therefore, we should let user login first and send the email accordingly but letting user wait until email being sent then log in.

### Why

For example, if a request takes too much time, sometimes users may reload again, then server needs to go through all the loading missions again and the users may reload again; as a result, to avoid it, we should put some unrush mission to background and do the urgent mission first.

### How

For example, if we want a resource to be inactive or deleted automatically at a particular moment. After the creation, we can put this action to the background with sidekiq and activate this action automatically once the condition meets.

#### install sidekiq
1. In Gemfile,
```
gem 'sidekiq', '~> 6.1', '>= 6.1.2'
```
2. In terminal, run
```
$ rails generate job ExpireProduct
```
to create job file for product expiration.

3. check `config/application.rb`, there should be
```
config.active_job.queue_adapter = :sidekiq
```
which tells rails to use sidekiq as default to deal with job.

4. In expire_product_job.rb,
```
class ExpireProductJob < ApplicationJob
  
  queue_as :default

  def perform(product)
    @product = product

    return if product_already_inactive?

    @product.status = "inactive"
    @product.save!
    
    UserMailer.with(product: @product).product_expired_notice.deliver_later

  end

  private
  def product_already_inactive?
    @product.status == "inactive"
  end

end
```
The meaning of the class above:
1. The methods in this class will be queue as default, meaning it will be moved out and put on background to wait. There are other options like :low_priority and :urgent.
2. It has one task to perform, changing status of a product from active to inactive once condition meets.
3. As you can see, `UserMailer.with(product: @product).product_expired_notice.deliver_later`, it is also a job, going to perform **later**.

##### ExpireProductJob
In controller, add `ExpireProductJob.set(wait_until: @product.expires_at).perform_later(@product)` as follow
```
class ProjectsController < ApplicationController
  ...
  def create
    @product = Product.new(product_params)
    @product.user_id = current_user.id

    respond_to do |format|
      if @product.save
        ExpireProductJob.set(wait_until: @product.expires_at).perform_later(@product)
        format.html { redirect_to @product, notice: "Product was successfully created." }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end
  ...
end
```
Then, this job will be performed later until product expiring datetime and if you want to get expiration effect immediately, add `ExpireProductJob.set(wait_until: @product.expires_at).perform_now(@product)` instead.


#####

### What
The partical implementation:
https://github.com/henVictor/marketplace

### Reference

[**Ruby on Rails 實戰聖經**](https://ihower.tw/rails/background-process.html "https://ihower.tw/rails/background-process.html")

[**Marketplace**](https://web-crunch.com/posts/ruby-on-rails-marketplace-stripe-connect)