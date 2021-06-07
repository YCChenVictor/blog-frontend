---
title: (Rails_20) API mode
description: ''
date: '2021-03-22T08:32:35.494Z'
categories: []
keywords: []
slug: /@t5204713910/rails-20-api-mode-21e759aa4345
---

### Introduction

API(Application Programming Interface) is the interface to exchange the files with particular format such as JSON or XML.

### Why?

If we need to print out same data on different machines, we need to pack this data into an acceptable format such as JSON so that it can be used on different machines.

### How?

#### With render

Create a user in a rails project. (`$rails new project -> $ rails g scaffold User name:string email:string -> In console, $ User.create name: “aaa”, email: “bbb”`)

Then in User Controller, specify the method, `index:`

def index  
  @users = User.all  
  render json: @users  
end

#### (What?) Then the webpage of index of user:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__hPlz0iX3HD__zZnfYYZ__s5A.png)

However, the webpage cannot show what it initially should be; as a result, we can use following to get the webpage (HTML) as well as JSON file.

def index  
  @users = User.all  
  respond\_to do |format|  
    format.json { render json: @users }  
    format.html { render :index }  
end

**Respond\_to (directly from** [**here**](https://stackoverflow.com/questions/9492362/rails-how-does-the-respond-to-block-work)**)**

*   `respond_to` is a method on the superclass `ActionController`.
*   it takes a block, which is like a delegate. The block is from `do` until `end`, with `|format|` as an argument to the block.
*   respond\_to executes your block, passing a Responder into the `format` argument.

#### With Jbuilder

After the scaffold method, there would be .erb files in views but also .json.jbuilder files. We can use gem Jbuilder to export result into JSON format.

In`app/views/users/index.json.jbuilder,` following code

json.array! [@users](http://twitter.com/users "Twitter profile for @users"), partial: "users/user", as: :user

This line of code means render `user/_user,` following code

json.extract! user, :id, :name, :email, :created\_at, :updated\_at  
json.url user\_url(user, format: :json)

The two line of code means extract the data in model, user and then input them into url with format json. Then we can use url to acquire the data with json format.

**Why we can do it?**

With `$rails routes,`

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__brFbtd9__9PWhAHWTlb1F3w.png)

As we can see, `.:format` means we need to specify the format of the file name and the default file format is html, meaning we can change it into json format to show it on web browser.

#### (What?) Then the webpage of index of user.json:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__uUOWYl6zKKP8gmFz4d5rHA.png)

### minor intermezzo

We can also specify API-Only mode with

$ rails new Project\_Name --api

to create rails project in api only mode with smaller number of Gem and middleware.

### Reference

[**Rails: How does the respond\_to block work?**  
_This is a block of Ruby code that takes advantage of a Rails helper method. If you aren't familiar with blocks yet, you…_stackoverflow.com](https://stackoverflow.com/questions/9492362/rails-how-does-the-respond-to-block-work "https://stackoverflow.com/questions/9492362/rails-how-does-the-respond-to-block-work")[](https://stackoverflow.com/questions/9492362/rails-how-does-the-respond-to-block-work)

[https://railsbook.tw/](https://railsbook.tw/)