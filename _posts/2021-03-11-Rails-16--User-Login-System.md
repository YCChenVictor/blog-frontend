---
layout: post
title: (Rails_16) User Login System
date: '2021-03-11'
categories: rails
keywords: []
note: Demonstrating the basic structure of login
---

### Structure Explanation

The structure would be MVC. There are going to have Sign Up page, Login Page, Profile Page.

### Create Rails Project

In folder you want to create rails project

$ rails new user\_login

### Build Routes

Let’s build routes first. Routes can be a overview for the design of website.

For routes [explanation](https://t5204713910.medium.com/rails-3-struture-route-21e66185e3c7)

For user login webpage, we are going to have the method to create, edit, update, show, destroy of users and the method to login and logout website.

As a result, in config/routes.rb,

Rails.application.routes.draw do  
    
  root 'sessions#home'  
    
  # for users  
  resources :users

\# for session  
  get '/login', to: 'sessions#login'  
  post '/login', to: 'sessions#create'  
  post '/logout', to: 'sessions#destroy'  
  get '/logout', to: 'sessions#destroy'

end

#### Test

With

rails routes

the available routes:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__mVsk6GlAi3V3uok7sDzVpg.png)

Notice! The GET represents the process to input url to website. We are going to construct all the routes with GET.

With the Routes, if we input the url: [http://127.0.0.1:3000/](http://127.0.0.1:3000/), the error pops up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__dtQd0JGd0sntqpBVTki4Sw.png)

meaning we need to build the controller for session and of course, controller for users. We build controller for session first.

### Create Session Controller

$ rails g controller sessions

After both creation of controllers, the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__gSZlgOZsaP7KSkPItoLX8A.png)

meaning there is no method, home in session controller. As a result, we can create following method in controller

class SessionscController < ApplicationController  
    
  def home  
  end

end

Then the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__JkEXB2fTuTLAbOeBrW5Bsg.png)

### Build HTML template

meaning we need to create html template for home. As a result, in app/views/session, add home.html.erb and input the following code

<h1>Hello World</h1>

Then the homepage:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__nBQcytmThRoxVHJDBM__RUA.png)

### Create User Controller

routes related to users:

users GET    /users(.:format)         users#index

      POST   /users(.:format)         users#create

 new\_user GET    /users/new(.:format)          users#new

edit\_user GET    /users/:id/edit(.:format)     users#edit

user GET    /users/:id(.:format)         users#show

     PATCH  /users/:id(.:format)         users#update

     PUT    /users/:id(.:format)         users#update

     DELETE /users/:id(.:format)         users#destroy

The GET method represents input the websties

If we input [http://127.0.0.1:3000/users](http://127.0.0.1:3000/users/new), the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ZgLjBavQqv__s7f__6kXKZOw.png)

meaning we need to create controller for user

$ rails g controller users

Then the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__8OA7oV4B3J7__JA__0q6uIdg.png)

meaning we need to create index method

### Create user methods

In app/users\_controller.rb, add

class UsersController < ApplicationController

  def index

  end

  ...

end

Then the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Vs__4mjpCewb1gaigyBk7nA.png)

meaning there is no template for users.

### Create View for Users

In app/views/users/, create index.html.erb:

<h1> Hello </h1>

Then the following webpage:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__X7KXKEjLZ1RJJC____edQjPw.png)

Then we are done.

### Let’s create all the routes over and over again

The next route with GET

new\_user GET    /users/new(.:format)

,so we input [http://127.0.0.1:3000/users/new](http://127.0.0.1:3000/users/new)

Then the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__7FbOR0Ilxz4C__g8nZ9a5GQ.png)

meaning we need to add methods in controller, so we add methods: new, create, show

class UsersController < ApplicationController

  ...

  def new

    @user = User.new

  end

  ...

end

Then the error:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__q2JGUB2x__6xhsekWALi3JQ.png)

meaning it cannot find user, which means there is no user model, so we create model

### Create User Model

In the project, generate model

$ rails g model User username:string password\_digest:string

#### Why the name is password\_digest rather than password?

To emphasize the method we create authentication. (Explanation of [Digest](https://medium.com/p/b28dad2dc9b7/edit))

In ruby, the we can use gemfile, `bcrypt` to salt and hash the password. In Gemfile, add

gem 'bcrypt'

Then, in terminal,

$ bundle install

(remember to restart rails to use bcrypt)

To use `bcrypt,` in models/user.rb add

class User < ApplicationRecord  
  has\_secure\_password  
end

Then following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__TQun8BVpSGJBEiFUpRZMpw.png)

### Do migration

$ rails db:migrate

Then following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__AFSiKG0sCOeo__YZ1N5OIdA.png)

meaning there are no template for user creation

### Build HTML Template for User Creation

In app/views/users/, add new.html.erb:

<h1>New Users Page</h1>

<%= form\_for [@user](http://twitter.com/user "Twitter profile for @user") do |f| %>  
  <%= f.label :username %>  
  <%= f.text\_field :username %><br>  
  <%= f.label :password %>  
  <%= f.password\_field :password %><br>  
  <%= f.submit "Create Account" %>

<% end %>

Then the following pops up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__LXR0OciDI74t8osMeNmkTQ.png)

Then we can test the creation by inputting username and password. Then the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__4zsaYfKGpZS1__P__wqjIgzA.png)

meaning we need to create create method

### Create Method for User Creation

In app/controllers/users\_controller.rb, add

class UsersController < ApplicationController

...

def create

@user = User.new(user\_params)  
    if @user.save  
      session\[:user\_id\] = @user.id  
      redirect\_to root\_path  
      
    else  
      render :new

    end   
end

private  
  def user\_params  
    params.require(:user).permit(:username, :password)

end

...

end

Then we can input username and password to test the user creation.

Then in `rails console` , input command

User.all

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__OeNTA__WqEkFDDGQ1FK6saA.png)

### Create edit

Then go back to see routes, we

edit\_user GET /users/:id/edit(.:format) users#edit

if we go to [http://127.0.0.1:3000/users/1/edit](http://127.0.0.1:3000/users/1/edit), error pops up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__0hZqXrALt8B6SK__53Gu5pw.png)

so we need to create edit method. In users\_controller.rb:

def edit  
  [@user](http://twitter.com/user "Twitter profile for @user") = User.find\_by(id: params\[:id\])  
end

Then the following error pops up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__0R9a9YlJBYEdnfiHsSDK1w.png)

meaning there is no template for editing. Then we can add edit.html.erb in app/views/edit.html.erb

<h1>Edit User Page</h1>

<%= form\_for [@user](http://twitter.com/user "Twitter profile for @user") do |f| %>  
  <%= f.label :username %>  
  <%= f.text\_field :username %><br>  
  <%= f.label :password %>  
  <%= f.password\_field :password %><br>  
  <%= f.submit "Edit Account" %>

<% end %>

Then the following error pops up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__xv9uVfkucxN8tBjO65zYcA.png)

meaning we need to add update method in users\_controller.rb

### Create Update Method in User Controller

Let’s add update method

def update  
  [@user](http://twitter.com/user "Twitter profile for @user") = User.find\_by(id: params\[:id\])  
  if [@user](http://twitter.com/user "Twitter profile for @user").update(user\_params)  
    redirect\_to root\_path  
  else  
    render :edit  
  end  
end

### Create Show Method in User Controller

Then the route:

user GET    /users/:id(.:format)

If we input [http://127.0.0.1:3000/users/1](http://127.0.0.1:3000/users/1), the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__lPX2YjR6U7sAcyOUxrJIqg.png)

meaning we need to create show method in user controller. In app/controllers/users\_controller.rb, add method:

def show  
  [@user](http://twitter.com/user "Twitter profile for @user") = User.find\_by(id: params\[:id\])

end

### Create View for Individual User (Show)

In app/views/users/, add show.html.erb

<%= [@user](http://twitter.com/user "Twitter profile for @user") %>

Then, we can show something on individual webpage.

### Create login Method in Session

In `rails routes` , we can see

login GET    /login(.:format)     sessions#login

meaning there is a GET route; however, if we input [http://127.0.0.1:3000/login](http://127.0.0.1:3000/login), the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__gWwzEOZcfJi99pd8otcx0A.png)

meaning we need to create login action in session controller; as a result, we can add in app/controllers/sessions\_controller.rb

class SessionsController < ApplicationController

  ...

  def login  
  end

  ...

end

Then the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__siP__UNwVDg__hGtXQYoY6pA.png)

meaning there is no view for login method

### Create View for Login

In app/views/sessions/, create login.html.erb, with

<div>  
  <h2>Login</h2>  
  <%= form\_tag '/login' do %>  
    Username: <%= text\_field\_tag :username %><br>  
    Password: <%= password\_field\_tag :password %><br>  
    <%= submit\_tag 'login' %>  
  <% end %>

</div>

Then the following webpage

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__rhEZpjxeYX3zPrZxvMe6UA.png)

After inputting some username, the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__URHwPj0zcgWnJfZIuqjrgQ.png)

meaning we need to add create method for session controller

### Create Method for Login

For user creating, we need POST to send data to server and add the following method:

class SessionsController < ApplicationController

...

def create  
    @user = User.find\_by(username: params\[:username\])

    if !!@user && @user.authenticate(params\[:password\])   
      session\[:user\_id\] = @user.id  
      redirect\_to user\_path([@user](http://twitter.com/user "Twitter profile for @user").id)

else  
      message = "something went wrong"  
      redirect\_to login\_path, notice: message  
    end

end

...

end

This method:

1.  find specific user with username
2.  if the user exists and the password is correct, then pass and show the view of specific user webpage
3.  or cannot pass

Notice, the method name is `create` ; however, this method does not create anything at all.

Then it will redirect to individual webpage.

### Reference

[**Creating a User Login System - Ruby on Rails**  
_The last few weeks I have been chronicling my experience creating an application using Rails and React with the…_dev.to](https://dev.to/kjdowns/creating-a-user-login-system-ruby-on-rails-2kl2 "https://dev.to/kjdowns/creating-a-user-login-system-ruby-on-rails-2kl2")[](https://dev.to/kjdowns/creating-a-user-login-system-ruby-on-rails-2kl2)