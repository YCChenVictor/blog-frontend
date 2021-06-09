---
layout: post
title: (Rails_3) Struture — Route
date: '2021-02-18T09:35:47.456Z'
categories: rails
note: Build route -> controller -> view -> controller -> model -> database’ from
  scratch
---

### MVC Structure

[explanation](https://www.youtube.com/watch?v=DUg2SWWK18I)

### Rails Structure: Route + Model, View, Controller, (MVC structure)

Open the rails project file

#### Route

The routes are all in the app\_name/config/routes.rb

#### Controller

Controllers are all in the app/controllers

The file names and the controller names are linked; for example,

**file name: users\_controller.rb <-> class name: UserController**

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____v2B8qf7cE6o6c3Da52RZQ.png)

#### Model

Models are all in `app/models`

**file name: user.rb <-> class name: User**

relationship between model, file, table names are as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__DaxkchK8XTz__pxNIrEzkpA.png)

#### View

Views are in the app/views

**relationship between controller and view file:**

For example, the view file related to controller, PostController will be in app/views/posts

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__cpsdh5x__A7PKg27wlCnOFQ.png)

### Build it step by step without scaffold — Route

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____vwCNj__r__wZtRLdMLv335A.png)

In project\_name/config/routes.rb, add the code as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__XfzSvdAX7A8KY2__u2XuByA.png)

Take the code

get "/posts", to: "posts#index"

as example

This line of code means when user input the website ./posts, it will render the

[http://127.0.0.1:3000/posts/index](http://127.0.0.1:3000/posts/index)

We can use following code to see the existing routes

$ rails routes

with the code above, the routes would be following

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__lsJX5h8Viy____yamYHDjvPg.png)

And then, the route will call the controller to do further action; however, there will be errors because there is still no controller and raise error as follow:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__tw6HHhMzyY7L7rRzvWIDPQ.png)

Then we start to build controller

#### RESTful API

REST means Representational State Transfer. The [full explanation](https://t5204713910.medium.com/what-is-restful-api-816a9ea6fe6a).

The benefit of RESTful API is unity. All coders have the consensus to write it in the same form.

The directly implementation in rails is to use `resources` method as follow:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__qGzuUl1QZXrzLIrEjFjV1A.png)

Then we can use again

$ rails routes

the results: (8 routes related to users)

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ZNgXbOxIkg0wSKGXm8aDCw.png)

The following table explains the usage of these routes

if we don’t want so many routes, we can use `only`or `except`

Rails.application.routes.draw do  
  resources :products, only: \[:index, :show\]  
  # or the following codes  
  # resources :products, except: \[:new, :create, :edit, :update,  
:destroy\]  
end

we can use `collection`and `member` to add sub layer for more manipulation; for example,

Rails.application.routes.draw do  
  resources :orders do  
    collection do  
      get :cancelled  
    end  
  end  
end

Then the routes:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__YTaNYTwb6aA41Ukylqj__og.png)

There is one more routes: cancelled\_orders

#### Admin Routes

we can specify routes name for administration; for example ‘asdfadfaew’

Rails.application.routes.draw do  
  namespace :admin, path: "asdfadfaew" do  
    resources :products  
  end  
end

Then the route path would be following

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__a0__F4MMPrazMJ8PGeD7CGg.png)

There is will be /asdfadfaew/… routes

### Reference:

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)