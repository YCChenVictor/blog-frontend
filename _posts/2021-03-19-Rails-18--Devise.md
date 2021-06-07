---
title: (Rails_18) Devise
description: ''
date: '2021-03-19T14:49:46.842Z'
categories: []
keywords: []
slug: /@t5204713910/rails-18-devise-75db6d99d4d7
---

### Introduction

Devise is a customizable solution for authentication in Rails. It is based on Warden, the framework for authentication in ruby; it has some characteristics:

1.  It is Rack based
2.  It is a complete MVC solution in Rails
3.  With one line `:authenticate_user!,` we can prevent any usage from user not signed in and once singed in, user can do various things.
4.  With modularity, we can choose **only** the modules we want

### Why?

The most popular authentication solution for Rails applications is _Devise._ The advantages:

1.  time saving; Authentication by hand requires multiple controllers and a mass time of setup
2.  useful helpers
3.  simple routes settings

### How?

There are ten modules:

1.  Database Authenticatable: hash and store the users’ password for users having the authenticity while login.
2.  Omniauthable: for adding OmniAuth for authentication. OmniAuth: a kind of open authentication (Oauth) for user to login with big website such as _Google_、_Facebook_、_Yahoo_、_GitHub_ so that the user will not need to authenticate again.
3.  Confirmable: sends email to verify whether accounts is correct and confirms the signing in.
4.  Recoverable: for user to reset the password and send instructions for resetting.
5.  Registerable: Design a process for registration for user to signing up and let them to edit or destroy their accounts.
6.  Rememberable: manage how token being produced and deleted. This information will be stored in the user-end cookie
7.  Trackable: Track the number of times, timestamp, IP location of the logins.
8.  Timeoutable: if a sessions have not been active in a period of time, it will expire this session.
9.  Validatable: Offers the mechanism for email and password verification. We can customize the mechanism.
10.  Lockable: Lock up an account, keeping failing to login in and offer a way to unlock it with email.

#### We are going to add devise to user login as follow:

In Gemfile, add the following

gem ‘devise’

Then run `bundle install`

After installing, we need the following generator to describe all the setting related to `devise`

$ rails generate devise:install

Then it will create `initializer` in app/config and the following message:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__MsUb__hbwzJSKDnXPvOED__A.png)

With the messages in terminal, we need to do the following tasks:

For message\_1: If we are going to send email to users, then in `config/environments/development.rb` add the default website for mailer.

```
config.action_mailer.default_url_options = { :host => 'localhost:3000' }
```

For message\_2: change the root path

For message\_3: we need to add flash message in html file to let user know if they are doing something wrong. In `app/views/layouts/application.html.erb,` add coding

<p class="notice"><%= notice %></p>  
<p class="alert"><%= alert %></p>

as follow

<!DOCTYPE html>  
<html>  
  <head>  
    <title>DeviseExample1</title>  
    <meta name="viewport" content="width=device-width,initial-scale=1">  
    <%= csrf\_meta\_tags %>  
    <%= csp\_meta\_tag %>

<%= stylesheet\_link\_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>  
    <%= javascript\_pack\_tag 'application', 'data-turbolinks-track': 'reload' %>  
  </head>

<body>  
    <p class="notice"><%= notice %></p>  
    <p class="alert"><%= alert %></p>  
    <%= yield %>  
  </body>  
</html>

Input`rails g devise:views` to generate HTML templates for registration, login, forget password, email, which are all in _app/views/devise._

Input`rails g devise user` to generate User model and Migration. (You can create any model with devise)

Before we do migration, we should go to `db/migrate/_devise_create_users.rb` to change the setting. For example, if we want the trackable effect, we can uncomment the lines of code below ##trackable.

\# frozen\_string\_literal: true

class DeviseCreateUsers < ActiveRecord::Migration\[6.1\]  
  def change  
    create\_table :users do |t|  
      ## Database authenticatable  
      t.string :email,              null: false, default: ""  
      t.string :encrypted\_password, null: false, default: ""

\## Recoverable  
      t.string   :reset\_password\_token  
      t.datetime :reset\_password\_sent\_at

\## Rememberable  
      t.datetime :remember\_created\_at

\## Trackable  
      # t.integer  :sign\_in\_count, default: 0, null: false  
      # t.datetime :current\_sign\_in\_at  
      # t.datetime :last\_sign\_in\_at  
      # t.string   :current\_sign\_in\_ip  
      # t.string   :last\_sign\_in\_ip

\## Confirmable  
      # t.string   :confirmation\_token  
      # t.datetime :confirmed\_at  
      # t.datetime :confirmation\_sent\_at  
      # t.string   :unconfirmed\_email # Only if using reconfirmable

\## Lockable  
      # t.integer  :failed\_attempts, default: 0, null: false # Only if lock strategy is :failed\_attempts  
      # t.string   :unlock\_token # Only if unlock strategy is :email or :both  
      # t.datetime :locked\_at

t.timestamps null: false  
    end

add\_index :users, :email,                unique: true  
    add\_index :users, :reset\_password\_token, unique: true  
    # add\_index :users, :confirmation\_token,   unique: true  
    # add\_index :users, :unlock\_token,         unique: true  
  end  
end

Then we can do migration `rails db:migrate.`

For the basic example of User model, we can add first and last name with `rails generate migration add_name_to_users name:string surname:string` and do migration again. Input `rails db:migrate` to do database migration again. (This step also means that we can add more models and do lots of modifications to customize the contents)

Then in [http://127.0.0.1:3000/users/sign\_up](http://127.0.0.1:3000/users/sign_up), we should see the following

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ZiHmL8e8t0hh07BzD1VGbg.png)

do some modification: adding two field for name and surname below the field for email in

```
<h2>Sign up</h2><%= form_for(resource, as: resource_name, url: registration_path(resource_name)) do |f| %>  <%= render "devise/shared/error_messages", resource: resource %>  <div class="field">    <%= f.label :email %><br />    <%= f.email_field :email, autofocus: true, autocomplete: "email" %>  </div>
```

```
<div class="field">    <%= f.label :name %><br />    <%= f.text_field :name %>  </div>  <div class="field">    <%= f.label :surname %><br />    <%= f.text_field :surname %>  </div>
```

```
  <div class="field">    <%= f.label :password %>    <% if @minimum_password_length %>    <em>(<%= @minimum_password_length %> characters minimum)</em>    <% end %><br />    <%= f.password_field :password, autocomplete: "new-password" %>  </div>  <div class="field">    <%= f.label :password_confirmation %><br />    <%= f.password_field :password_confirmation, autocomplete: "new-password" %>  </div>  <div class="actions">    <%= f.submit "Sign up" %>  </div><% end %><%= render "devise/shared/links" %>
```

Then we can do experiment, adding a user with the sign up webpage. In rails console, we should see the following

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__yH__l67xnLP4ohEnftZ8Pug.png)

Notice! There is no name and surname in the database because we need to explicitly tell rails to accept these two fields in the form. As a result, in `app/controllers/application_controller.rb`

```
class ApplicationController < ActionController::Base  protect_from_forgery with: :exception  before_action :update_allowed_parameters, if: :devise_controller?  protected  def update_allowed_parameters    devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:name, :surname, :email, :password)}    devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:name, :surname, :email, :password, :current_password)}  endend
```

With method`update_allowed_parameters,` it can add name and surname in the database.

Let’s delete the user in rails console with`User.first.delete` and sign up again. Then the data we want is successfully input into database.

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__uPJ4Cvv2NnvZS976d9opqg.png)

### What?

The above steps show how to install devise in rails. With devise, we can have authentication in rails. It also shows how to do customized settings to database and related them to devise, meaning we can do it to other model we want in the future.

#### Add authentication

For example, if I want user to login before any action to a model, we can put

before\_action :authenticate\_user!, except: \[:index, :show\]

in that controller.

#### The object auto-created by devise

If the model created by devise is User, then the following methods:

**user\_signed\_in?**

To check whether a user signed in and return true or false.

**current\_user**

To get the current login user.

**user\_session**

It returns `warden.session` for model User and `warden.session` returns `rack.session` , which has encoding method and devise use it for authentication.

You can get the source code from devise/lib/devise/controllers/helpers.rb

### Reference

[**heartcombo/devise**  
_Devise is a flexible authentication solution for Rails based on Warden. It: Is Rack based; Is a complete MVC solution…_github.com](https://github.com/heartcombo/devise "https://github.com/heartcombo/devise")[](https://github.com/heartcombo/devise)

[**Ruby on Rails 實戰聖經**  
_Quality, Speed or Cheap. Pick two. - Unknown 使用者認證 Authentication用以識別使用者身分，而授權 Authorization 則用來處理使用者有沒有權限可以作哪些事情。…_ihower.tw](https://ihower.tw/rails/auth.html "https://ihower.tw/rails/auth.html")[](https://ihower.tw/rails/auth.html)

[**Using Devise In Your Ruby on Rails Application \[A Step-by-Step Guide\] | Hacker Noon**  
_Programming since 2008. Authentication. You don't always want your users to have faceless sessions that open your…_hackernoon.com](https://hackernoon.com/using-devise-in-your-ruby-on-rails-application-a-step-by-step-guide-m92i3y5s "https://hackernoon.com/using-devise-in-your-ruby-on-rails-application-a-step-by-step-guide-m92i3y5s")[](https://hackernoon.com/using-devise-in-your-ruby-on-rails-application-a-step-by-step-guide-m92i3y5s)

[**heartcombo/devise**  
_You can't perform that action at this time. You signed in with another tab or window. You signed out in another tab or…_github.com](https://github.com/heartcombo/devise/blob/master/lib/devise/controllers/helpers.rb "https://github.com/heartcombo/devise/blob/master/lib/devise/controllers/helpers.rb")[](https://github.com/heartcombo/devise/blob/master/lib/devise/controllers/helpers.rb)

[**Warden 的代码学习**  
_warden 是 devise 依赖的一个 Authentication Framework，作为一个框架，warden 解决了下面这些问题 auth result handle 要能够处理验证的结果，验证通过就跳到下面的 action…_ruby-china.org](https://ruby-china.org/topics/32842 "https://ruby-china.org/topics/32842")[](https://ruby-china.org/topics/32842)

[**wardencommunity/warden**  
_General Rack Authentication Framework. Contribute to wardencommunity/warden development by creating an account on…_github.com](https://github.com/wardencommunity/warden/blob/master/lib/warden/mixins/common.rb "https://github.com/wardencommunity/warden/blob/master/lib/warden/mixins/common.rb")[](https://github.com/wardencommunity/warden/blob/master/lib/warden/mixins/common.rb)

[**Devise Authentication with Rails 5**  
levelup.gitconnected.com](https://levelup.gitconnected.com/devise-authentication-with-rails-5-815b5a9d6daf "https://levelup.gitconnected.com/devise-authentication-with-rails-5-815b5a9d6daf")[](https://levelup.gitconnected.com/devise-authentication-with-rails-5-815b5a9d6daf)