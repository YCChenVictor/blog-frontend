---
title: (Rails_4) Controller
description: >-
  Build ‘route -> controller -> view -> controller -> model -> database’ from
  scratch
date: '2021-02-19T08:09:43.772Z'
categories: []
keywords: []
slug: /@t5204713910/rails-4-controller-4536ac0dae44
---

After the [route](https://t5204713910.medium.com/rails-3-struture-route-21e66185e3c7)s, let’s start to explore controller.

### Introduction

controllers control the flow of an app. The controllers activate models or views to fetch or save data or to create HTML output.

### Why

With controller, we can move all the logics to model and only show necessary information on view.

### (How) Build controller step by step

#### Corresponding Routes

In config/routes.rb, input the following code

Rails.application.routes.draw do  
  get "/hello\_world", to: "pages#hello"  
  resources :posts  
  resources :users  
endw

Take a look at `get "/hello_world", to: "pages#hello".` This route means if user input the url `"/hello_world",` (which is a GET), it will activate method, hello in page controller.

#### Add Controller

run the following code in terminal

$ rails g controller pages

the creation is as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__KF3mFWIOzrQ9v7Mt241sAQ.png)

Then there would be pages\_controller.rb

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__1GPk5ECjq6b7Fr6FruXmFg.png)

As you can see, the convention of naming in rails: pages\_controller.rb matches PagesControllers.

#### Corresponding Method in Controller

In app/controllers/pages\_controller.rb,

class PagesController < ApplicationController  
  def hello  
    render plain: "<h1>Hello World!</h1>"  
  end  
end

Then input the site: [http://127.0.0.1:3000/hello\_world](http://127.0.0.1:3000/hello_world) we can get a website with html: `<h1> Hello World! </h1>`; however, the html is just too plain, so we may add some cool styling.

#### Data in HTML Template (View)

Although the controller itself can print out text we want in website, for maintenance, we should separate the html files and the methods. In rails, the controller itself automatically tries to find the file name same as the method name; for example, for method name, hello, it will tires to find the html file name, hello.html.erb. If there is no such file, we should create one with path `app/view/pages/hello.html.erb`

and move

<h1>Hello World</h1>

in it

and also, clean out the codes in app/controllers/pages\_controller.rb as follow:

class PagesController < ApplicationController  
  def hello  
  end  
end

### (What) Real example — BMI Calculator

#### Generate Controller

$ rails g controller bmi index

It will create controller called bmi **with method index** and it will also create route (in app/config/routes.rb) and method (app/controllers/bmi\_controller.rb) automatically

#### Build View (html template)

In app/views/bmi/index.html.erb, add the following codes:

<h1>BMI calculator</h1>

<%= form\_tag '/bmi/result' do %>  
  Height:<%= text\_field\_tag 'body\_height' %> centimeter<br />  
  Weight:<%= text\_field\_tag 'body\_weight' %> kilogram<br />  
  <%= submit\_tag "start" %>  
<% end %>

#### Construct Action in Controller to Calculate BMI

class BmiController < ApplicationController

  def index  
  end

  def result  
    height = params\[:body\_height\].to\_f / 100  
    weight = params\[:body\_weight\].to\_f  
    [@bmi](http://twitter.com/bmi "Twitter profile for @bmi") = (weight / (height \* height)).round(2)  
  end

end

The instance variable @bmi is for View to take

Notice! `params` serves as a way to access the data input by users; that is, after users input data in View, `params[:body_height]` get the data from markup with `name='body_height'.`

#### Print Out Result

Add a file app/views/bmi/result.html.erb with following code. This file corresponds with the method, result

<h1>BMI:<%= [@bmi](http://twitter.com/bmi "Twitter profile for @bmi") %></h1>

Add Route for printing result. In config/routes.rb, add following code

Rails.application.routes.draw do  
    
  get "bmi", to: "bmi#index"  
  post "bmi/result", to: "bmi#result"  
  get "hello\_world", to: "pages#hello"  
  resources :posts  
  resources :users

end

### reference

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)

[**Action Controller Overview - Ruby on Rails Guides**  
_Action Controller OverviewIn this guide you will learn how controllers work and how they fit into the request cycle in…_guides.rubyonrails.org](https://guides.rubyonrails.org/action_controller_overview.html "https://guides.rubyonrails.org/action_controller_overview.html")[](https://guides.rubyonrails.org/action_controller_overview.html)