---
title: (Rails_17) Mail Verification
description: ''
date: '2021-03-19T06:49:01.045Z'
categories: []
keywords: []
slug: /@t5204713910/rails-17-mail-verification-46b964a8ba19
---

### Mail Sending

In rails project, generate mailer with

$ rails g mailer Contact

and then rails will create following files:

1\. app/mailers/application\_mailer.rb&contact\_mailer.rb

2\. app/views/layouts/mailer.html.erb&mailer.text.erb

3\. app/views/contact\_mailer

**The concept of mailer is similar to controller and view. Let’s explore more to those files created.**

#### **application\_mailer.rb:**

class ApplicationMailer < ActionMailer::Base  
  default from: '[from@example.com](mailto:from@example.com)'  
  layout 'mailer'  
end

The concept of this file:

1.  `default from: 'from@example.com'` means by default, the mail will be sent to from@example.com

2\. `layout 'mailer'` means by default, it will find the template, mailer.html.erb

#### **contact\_mailer.rb:**

class ContactMailer < ApplicationMailer  
end

Just like how controller connect to views, the method name in controller is by default the same as the html file name; for example, we create following method in contact\_mailer.rb

class ContactMailer < ApplicationMailer  
  def say\_hello\_to(user)  
    [@user](http://twitter.com/user "Twitter profile for @user") = user  
    mail to:[@user](http://twitter.com/user "Twitter profile for @user").email, subject:"Hello!!"  
  end  
end

Then the method will try to find say\_hello\_to.html.erb in views/contact\_mailer

#### views/contact\_mailer/say\_hello\_to.html.erb

The text in this file will be the context of the email that the system is going to send

<%= [@user](http://twitter.com/user "Twitter profile for @user").name %>,Hello:

Have a nice day!~

### Then how did the mail sent?

By default, there is no specific webpage for mail sending. The mail sending process should be attached on the methods created; for example, if we want to send mail every time we create a user, we should add the following in the method, `create` of user controller

class UsersController < ApplicationController  
  ...

  def create  
    [@user](http://twitter.com/user "Twitter profile for @user") = User.new(user\_params)  
    if [@user](http://twitter.com/user "Twitter profile for @user").save  
      ContactMailer.say\_hello\_to([@user](http://twitter.com/user "Twitter profile for @user")).deliver\_now  
      redirect\_to [@user](http://twitter.com/user "Twitter profile for @user"), notice: 'User was successfully created.'  
    else  
      render :new  
    end  
  end

  ...

end

The coding `ConcactMailer.say_hello_to(@user).deliver_now`means it call the method to send say hello after creating user and the mail is the input mail in user creating method.

We should add the user before testing, please generate user first.

$ rails generate scaffold User name:string email:string tel:string

and then do migration

$ rails db:migrate

### Third Party Package: [Mailgun](https://www.mailgun.com/)

We may need third party professional package to send the email. In Mailgun, get the domain for mail sending. With this domain, we can send the email with its [smtp (simple mail transfer protocol)](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) server. The [way to get domain in mailgun.](https://support.cloudways.com/configure-mailgun-smtp/) After the steps to set up mailgun, add the following in `config/environments/development.rb`

Rails.application.configure do  
    
  ...

  # add the following SMTP setup  
  config.action\_mailer.delivery\_method = :smtp  
  config.action\_mailer.smtp\_settings = {  
    address: 'smtp.mailgun.org',  
    port: 587,  
    domain: 'any\_domain\_name',  
    user\_name: 'user\_name\_from\_mailgun',  
    password: 'password\_from\_mailgun',  
    authentication: 'plain',  
    enable\_starttls\_auto: true  
  }  
end

After creating users, in mailgun dashboard, we can check whether mail sent.

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__tjoMode96kMVQdhLZlhYXA.png)

### Reference

[https://railsbook.tw/](https://railsbook.tw/)