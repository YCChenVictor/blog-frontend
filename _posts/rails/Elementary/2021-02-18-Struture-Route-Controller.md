---
layout: post
title: (Rails Elementary 2) Struture (1), Route (2), Controller (3)
date: '2021-02-18T09:35:47.456Z'
categories: rails
note: to be continued
---

## MVC Structure (1)

[explanation](https://www.youtube.com/watch?v=DUg2SWWK18I)

## Rails Structure: Route + Controller, Model, View

Open the rails project file

### Route

The routes are in `app_name/config/routes.rb`

### Controller

Controllers are in `app/controllers`.

What is controller? it coordinates the interaction between user (routes), view, and model.

The file names and the controller names are linked; for example,

file name: users_controller.rb <-> class name: UserController
<img src="/assets/img/1____v2B8qf7cE6o6c3Da52RZQ.png" alt="">

### Model

Models are in `app/models`

file name: user.rb <-> class name: User

relationship between model, file, table names are as follow
<img src="/assets/img/1__DaxkchK8XTz__pxNIrEzkpA.png" alt="">

### View

Views are in `app/views`

**relationship between controller and view file:**

For example, the view file related to controller, PostController will be in `app/views/posts`
<img src="/assets/img/1__cpsdh5x__A7PKg27wlCnOFQ.png" alt="">

### Build it step by step without scaffold — Route
<img src="/assets/img/1____vwCNj__r__wZtRLdMLv335A.png" alt="">

In `project_name/config/routes.rb`, add the code as follow
<img src="/assets/img/1__XfzSvdAX7A8KY2__u2XuByA.png" alt="">

Take the code
```
get "/posts", to: "posts#index"
```
as example

This line of code means when user input the website `./posts`, it will render [http://127.0.0.1:3000/posts/index](http://127.0.0.1:3000/posts/index)

We can use following code to see the existing routes
```
$ rails routes
```
with the code above, the routes would be following
<img src="/assets/img/1__lsJX5h8Viy____yamYHDjvPg.png" alt="">

After input the website, the route will call the method in controller; however, there would be errors because there is no controller as follow:
<img src="/assets/img/1_tw6HHhMzyY7L7rRzvWIDPQ.png" alt="">

Then we start to build controller.

## Routes (2) (RESTful API)

REST means Representational State Transfer ([full explanation](之後要設定連結到 what-is-RESTful-API 那篇)). The benefit of RESTful API is unity. All coders have the consensus to write it in the same form. The direct implementation in rails is to use `resources` method as follow:
<img src="/assets/img/1_qGzuUl1QZXrzLIrEjFjV1A.png" alt="">

Then we can use again
```
$ rails routes
```
the results: (8 routes related to users)
<img src="/assets/img/1__ZNgXbOxIkg0wSKGXm8aDCw.png" alt="">

We can use `only` or `except` to set the only routes we need
```
Rails.application.routes.draw do  
  resources :products, only: [:index, :show]
  # or the following codes
  # resources :products, except: [:new, :create, :edit, :update, :destroy]
end
```
we can use `collection` and `member` to add sub layer for more manipulation; for example,
### collection
```
Rails.application.routes.draw do  
  resources :orders do  
    collection do  
      get :cancelled  
    end  
  end  
end
```
Then the routes:
<img src="/assets/img/1_YTaNYTwb6aA41Ukylqj-og.png" alt="">

There is one more route: `cancelled_orders`
### member
時間不夠，來不及補，跟 collection 的差別是，member 會帶 id，collection 不會

member: xxx/id/xxx

collection: xxx/xxx

### Admin Routes

we can specify routes name for administration; for example `asdfadfaew`
```
Rails.application.routes.draw do  
  namespace :admin, path: "asdfadfaew" do  
    resources :products  
  end  
end
```
Then the route path would be as follow:
<img src="/assets/img/1_a0_F4MMPrazMJ8PGeD7CGg.png" alt="">

There is will be `/asdfadfaew/…` routes

After the route, let’s start to explore controller.

### the best way to arrange routes
skip

### routes & Domain Specific Language (DSL)
skip

## Controller (3)

controllers control the flow of an app. The controllers activate models or views to fetch or save data or to create HTML output.

### Why

With controller, we can move all the logics to model and only show necessary information on view.

### (How) Build controller step by step

#### Corresponding Routes

In `config/routes.rb`, input the following code
```
Rails.application.routes.draw do  
  get "/hello_world", to: "pages#hello"  
  resources :posts  
  resources :users  
endw
```
Take a look at `get "/hello_world", to: "pages#hello".` This route means if user input the url `"/hello_world",` (which is a GET), it will activate method, hello in page controller.

#### Add Controller

run the following code in terminal
```
$ rails g controller pages
```
the creation is as follow
<img src="/assets/img/1__KF3mFWIOzrQ9v7Mt241sAQ.png" alt="">

Then there would be pages_controller.rb
<img src="/assets/img/1__1GPk5ECjq6b7Fr6FruXmFg.png" alt="">

As you can see, the convention of naming in rails: `pages_controller.rb` matches `PagesControllers`.

#### Corresponding Method in Controller

In `app/controllers/pages_controller.rb`,
```
class PagesController < ApplicationController  
  def hello  
    render plain: "<h1>Hello World!</h1>"  
  end  
end
```
Then input the site: http://127.0.0.1:3000/hello_world we can get a website with html: `<h1> Hello World! </h1>`; however, the html is just too plain, so we may add some cool styling.

#### Data in HTML Template (View)

Although the controller itself can print out text we want in website, for maintenance, we should separate the html files and the methods. In rails, the controller itself automatically tries to find the file name same as the method name; for example, for method name, hello, it will tires to find the html file name, hello.html.erb. If there is no such file, we should create one with path `app/view/pages/hello.html.erb`

and move
```
<h1>Hello World</h1>
```
in it

and also, clean out the codes in app/controllers/pages_controller.rb as follow:
```
class PagesController < ApplicationController  
  def hello  
  end  
end
```
### (What) Real example — BMI Calculator

#### Generate Controller
```
$ rails g controller bmi index
```
It will create controller called bmi **with method index** and it will also create route (in `app/config/routes.rb`) and method (`app/controllers/bmi_controller.rb`) automatically

#### Build View (html template)

In `app/views/bmi/index.html.erb`, add the following codes:
```
<h1>BMI calculator</h1>

<%= form_tag '/bmi/result' do %>  
  Height:<%= text_field_tag 'body_height' %> centimeter<br />  
  Weight:<%= text_field_tag 'body_weight' %> kilogram<br />  
  <%= submit_tag "start" %>  
<% end %>
```
#### Construct Action in Controller to Calculate BMI
```
class BmiController < ApplicationController

  def index  
  end

  def result  
    height = params[:body_height].to_f / 100  
    weight = params[:body_weight].to_f  
    @bmi = (weight / (height * height)).round(2)  
  end

end
```
The instance variable `@bmi` is for View to take

Notice! `params` serves as a way to access the data input by users; that is, after users input data in View, `params[:body_height]` get the data from markup with `name='body_height'.`

#### Print Out Result

Add a file `app/views/bmi/result.html.erb` with following code. This file corresponds with the method, result
```
<h1>BMI:<%= @bmi %></h1>
```
Add Route for printing result. In `config/routes.rb`, add following code
```
Rails.application.routes.draw do  
    
  get "bmi", to: "bmi#index"  
  post "bmi/result", to: "bmi#result"  
  get "hello_world", to: "pages#hello"  
  resources :posts  
  resources :users

end
```
### Reference:

[**為你自己學 Ruby on Rails 高見龍**](https://railsbook.tw/)