---
layout: post
title: (Rails_10) CRUD details without scaffold
description: 'The steps: Neat Controller (19) -> Use Bootstrap (20)'
date: '2021-03-01T10:38:03.822Z'
categories: rails
note: 'The steps: Neat Controller (19) -> Use Bootstrap (20)'
---

### General Concept:

CRUD means Create, Read, Update, Delete. For rails, we can use following code to build all related stuff:

rails generate scaffold User name:string email:string tel:string

Then it will generate a model named User with name, email, tel column name

In railsbook, the example is voting system. Let’s review the basic structure of Route-MVC structure

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/0__QHW__zWH__QqFy4L17.png)

### Neat Controller (19)

Let’s look at the app/controllers/candidates\_controller.rb. The following code repeated a lot

@candidate = Candidate.find\_by(id:params\[:id\])

We can use `before_action` to do it before any action. Above any method coding add

before\_action :find\_candidate, only: \[:edit, :update, :destroy, :vote\]

It means when it call the four method: edit, update, destroy, vote, do the method, find\_candidate first.

Then we can change the methods from

def edit  
  [@candidate](http://twitter.com/candidate "Twitter profile for @candidate") = Candidate.find\_by(id: params\[:id\])  
end

def update  
  [@candidate](http://twitter.com/candidate "Twitter profile for @candidate") = Candidate.find\_by(id: params\[:id\])  
  if [@candidate](http://twitter.com/candidate "Twitter profile for @candidate").update(candidate\_params)  
    redirect\_to candidates\_path, notice: "successfully updating!"  
  else  
    render :edit  
  end  
end

def destroy  
  [@candidate](http://twitter.com/candidate "Twitter profile for @candidate") = Candidate.find\_by(id: params\[:id\])  
  [@candidate](http://twitter.com/candidate "Twitter profile for @candidate").destroy if [@candidate](http://twitter.com/candidate "Twitter profile for @candidate")  
  redirect\_to candidates\_path, notice: "Successfully deleted!"  
end

def vote  
  [@candidate](http://twitter.com/candidate "Twitter profile for @candidate") = Candidate.find\_by(id: params\[:id\])  
  [@candidate](http://twitter.com/candidate "Twitter profile for @candidate").vote\_logs.create(ip\_address: request.remote\_ip) if [@candidate](http://twitter.com/candidate "Twitter profile for @candidate")  
  redirect\_to candidates\_path, notice: "vote accomplished!"  
end

to

def edit  
end

def update  
  if [@candidate](http://twitter.com/candidate "Twitter profile for @candidate").update(candidate\_params)  
    redirect\_to candidates\_path, notice: "successfully updating!"  
  else  
    render :edit  
  end  
end

def destroy  
  [@candidate](http://twitter.com/candidate "Twitter profile for @candidate").destroy if [@candidate](http://twitter.com/candidate "Twitter profile for @candidate")  
  redirect\_to candidates\_path, notice: "Successfully deleted!"  
end

def vote  
  [@candidate](http://twitter.com/candidate "Twitter profile for @candidate").vote\_logs.create(ip\_address: request.remote\_ip) if [@candidate](http://twitter.com/candidate "Twitter profile for @candidate")  
  redirect\_to candidates\_path, notice: "vote accomplished!"  
end

### Use Bootstrap (20)

we can use gem file `bootstrap-sass` , the [installation](https://github.com/twbs/bootstrap-sass) (you must follow the official method to install it)

#### Steps for bootstrap-sass

In Gemfile, add

gem 'bootstrap-sass', '~> 3.4.1'  
gem 'sassc-rails', '>= 2.1.0'

and then

$ bundle install

Then create app/assets/stypesheets/application.scss

In application.scss, add

// "bootstrap-sprockets" must be imported before "bootstrap" and "bootstrap/variables"  
@import "bootstrap-sprockets";  
@import "bootstrap";

if application.css exists, remove it

Then, in app/views/layouts/application.html.erb, warp `<%= yield %>` with `<div>`

<body>  
  <%= notice %>  
  <div class="container">  
  <%= yield %>  
  </div>  
</body>

Then the mainpage is better looking

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__X6tfepgBRMhJUc2NEFSdjg.png)

#### Table

In app/views/views/index.html.erb, add class, table

<table class="table">

The main page:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__1l5mqvtiUs6f6__3a8uZ3Gg.png)

#### Button

we want to make the vote as button. In app/views/candidates/index.html.erb

<td><%= link\_to "Vote", vote\_candidate\_path(candidate), method: "post", data: { confirm: "are you sure?" }, class:"btn btn-danger btn-xs" %></td>

#### Simple form

The create and edit page looks as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__aqvojQdDF2B__27DjxTBWow.png)

we can install simple\_form with integration with bootstrap

Add the following into gemfile

gem 'simple\_form'

Run bundle install

bundle install

Then generate simple\_form

$ rails generate simple\_form:install --bootstrap

Then edit app/views/candidates/\_form.html.erb

<%= simple\_form\_for(candidate) do |f| %>  
  <%= f.input :name, label: "name" %>  
  <%= f.input :age, label: "age" %>  
  <%= f.input :party, label: "party" %>  
  <%= f.input :politics, label: "presentation" %>  
  <%= f.submit %>  
<% end %>

The page will look like

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__OIBCMTz2FQ85Ik71FzJEPQ.png)

### Reference:

[**twbs/bootstrap-sass**  
_bootstrap-sass is a Sass-powered version of Bootstrap 3, ready to drop right into your Sass powered applications. This…_github.com](https://github.com/twbs/bootstrap-sass "https://github.com/twbs/bootstrap-sass")[](https://github.com/twbs/bootstrap-sass)

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)