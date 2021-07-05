---
layout: post
title: (Rails 9) Action Mailer & Mail Verification
description: ''
date: '2021-03-19'
categories: rails
---

### Mail Sending

In rails project, generate mailer with
```
$ rails g mailer Contact
```
and then rails will create following files:

1. `app/mailers/application_mailer.rb` & `contact_mailer.rb`

2. `app/views/layouts/mailer.html.erb` & `mailer.text.erb`

3. `app/views/contact_mailer`

**The concept of mailer is similar to controller and view. Let’s explore more to those files created.**

#### **application_mailer.rb:**
```
class ApplicationMailer < ActionMailer::Base  
  default from: 'from@example.com'
  layout 'mailer'  
end
```
The concept of this file:

1.  `default from: 'from@example.com'` means by default, the mail will be sent by from@example.com

2. `layout 'mailer'` means by default, it will find the template, `mailer.html.erb`

#### **contact_mailer.rb:**
```
class ContactMailer < ApplicationMailer  
end
```
Just like how controller connect to views, the method name in controller is by default the same as the html file name; for example, we create following method in `contact_mailer.rb`
```
class ContactMailer < ApplicationMailer  
  def say_hello_to(user)  
    @user = user  
    mail to: @user.email, subject:"Hello!!"  
  end  
end
```
Then the method will try to find `say_hello_to.html.erb` in `views/contact_mailer`

#### views/contact_mailer/say_hello_to.html.erb

The text in this file will be the context of the email that the system is going to send
```
<%= @user.name %>,Hello:

Have a nice day!~
```
### Then how did the mail sent?

By default, there is no specific webpage for mail sending. The mail sending process should be attached on the methods created; for example, if we want to send mail every time we create a user, we should add the following in the method, `create` of user controller
```
class UsersController < ApplicationController  
  ...

  def create  
    @user = User.new(user_params)  
    if @user.save  
      ContactMailer.say_hello_to(@user).deliver_now  
      redirect_to @user, notice: 'User was successfully created.'  
    else  
      render :new  
    end  
  end

  ...

end
```
The coding `ConcactMailer.say_hello_to(@user).deliver_now` means it call the method to send say hello after creating user and the mail is the input mail in user creating method.

We should add the user before testing, please generate user first.
```
$ rails generate scaffold User name:string email:string tel:string
```
and then do migration
```
$ rails db:migrate
```
### Third Party Package: [Mailgun](https://www.mailgun.com/)

We may need third party professional package to send the email. In Mailgun, get the domain for mail sending. With this domain, we can send the email with its [smtp (simple mail transfer protocol)](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) server. The [way to get domain in mailgun.](https://support.cloudways.com/configure-mailgun-smtp/) After the steps to set up mailgun, add the following in `config/environments/development.rb`
```
Rails.application.configure do  
    
  ...

  # add the following SMTP setup  
  config.action_mailer.delivery_method = :smtp  
  config.action_mailer.smtp_settings = {  
    address: 'smtp.mailgun.org',  
    port: 587,  
    domain: 'any_domain_name',  
    user_name: 'user_name_from_mailgun',  
    password: 'password_from_mailgun',  
    authentication: 'plain',  
    enable_starttls_auto: true  
  }  
end
```
After creating users, in mailgun dashboard, we can check whether mail sent in mailgun API.
<img src="/assets/img/1__tjoMode96kMVQdhLZlhYXA.png" alt="">

### Reference

[https://railsbook.tw/](https://railsbook.tw/)