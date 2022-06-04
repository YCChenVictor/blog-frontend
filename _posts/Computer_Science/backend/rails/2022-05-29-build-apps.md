---
layout: post
title: build apps
description: ''
date: '2022-05-29'
categories: rails
note: 我的眼睛有點不舒服，先到 add controller，之後要持續整理，就是慢慢把之前的文章摘掉
mathjax:
mermaid:
p5:
threeJS:
anchor:
---

## Introduction

This articles describes how to build an app (users can post articles) in rails with following steps:

* install rails
* start a project
* the concept of scaffold (for users)
* migration
* CRUD
* relational model without scaffold (for posts)
* routes without scaffold (for posts)
* controller without scaffold (for posts)
* view without scaffold (for posts)
* try to create a post with a user
* style

## Why?

Rails is really good for minimum viable product.

## How? & What?

### Install rails

```bash
gem install rails -v 5.1.1
```

* check rails version

```bash
rails -v
```

### Start a project

```bash
rails new app_name
```

If you want to create rails project with particular version, then

```bash
rails 3.2.14 new app_name
```

after the creation, please `cd` into the project directory and start the server with

```bash
rails s
```

<img src="/assets/img/rails_server_start.png" alt="rails_server_start">

open browsers and input `http://localhost:3000`

<img src="/assets/img/rails_start_page.png" alt="rails_start_page">

### the concept of scaffold

Scaffold in rails is a quick way to create MVC structure; for example, if you want to create a MVC structure with database, user (name:string, email:string, tel:string), in the directory of the project,

``` bash
rails g scaffold User name:string email:string tel:string
```
<img src="/assets/img/1__p5eI09hN9pyvsxCo102__nw.png" alt="">

As you can see, there are files for `active_record`, `resource_route`, `scaffold_controller`, `test_unit`, `assets`, `scss`.

#### route

The routes are in `app_name/config/routes.rb`:

```ruby
Rails.application.routes.draw do
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
```

* RESTful API (interlude): REST means Representational State Transfer. The benefit of RESTful API is unity. All coders have the consensus to write it in the same form; for example, given `resources :users` and input `rails routes`, the routes:

| Prefix | Verb | URI Pattern | Controller#Action |
| :-----: | :-: | :-: |
| users | GET | /users(.:format) | users#index |
|  | POST | /users(.:format) | users#create |
| new_user | GET | /users/new(.:format) | users#new |
| edit_user | GET | /users/:id/edit(.:format) | users#edit |
| user | GET | /users/:id(.:format) | users#show |
|  | PATCH | /users/:id(.:format) | users#update |
|  | PUT | /users/:id(.:format) | users#update |
|  | DELETE | /users/:id(.:format) | users#destroy |

As you can see, there are four verbs following RESTful, `GET`, `POST`, `PATCH`, `DELETE`, directed to the CRUD methods of controller and the controller call the corresponding CRUD methods to database. Actually, `GET` maps READ, `POST` maps CREATE, `PATCH` maps UPDATE, `DELETE` maps DESTROY.

#### controller

Controllers are in `app/controllers`. The file names and the controller names are linked; for example, file name: `users_controller.rb` maps class, `UserController` as follow:

<img src="/assets/img/1____v2B8qf7cE6o6c3Da52RZQ.png" alt="">

#### model

Models are in `app/models`. file name: `user.rb` maps class `User` and maps table `users`.

#### view

Views are in `app/views`. For example, the view file related to controller, `UserController` will be in `app/views/users` as follow:

<img src="/assets/img/1__cpsdh5x__A7PKg27wlCnOFQ.png" alt="">

### Migration

Migration is going to modify database for this project according to the files in `db/migrate`. In the directory of this project

```bash
bin/rails db:migrate RAILS_ENV=development
```

It will run the code as follow in `db/migrate/xxxx_create_users.rb` as follow:

```ruby
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :tel
    end
  end
end
```

Then start the server again and input `http://localhost:3000/users` in browser.

<img src="/assets/img/1____Yp2j7kic__5QHtdcRC2X8g.png" alt="">

This is the page to list all the users. The dataflow is as follow:

* the browser GET the url from server
* with route, backend knows which controller method it is calling
* the method operates SQL command for read to database
* the method render the page with data read from database
* browser render the view page

### CRUD

In above section, we know the method maps to `Read`; actually, there are four methods in database: `Create`, `Read`, `Update`, `Delete`.

#### Create

Click the New User in main page. Then the following webpage pops up
<img src="/assets/img/1__D9wMcZ5NloIWuuY16__z34g.png" alt="">

and the SQL command as follow:

```bash
Started POST "/users" for ::1 at 2022-05-29 15:58:06 +0800
Processing by UsersController#create as HTML
  Parameters: {"authenticity_token"=>"[FILTERED]", "user"=>{"name"=>"test", "email"=>"test@example.com", "tel"=>"123123123"}, "commit"=>"Create User"}
  TRANSACTION (0.3ms)  begin transaction
  ↳ app/controllers/users_controller.rb:27:in `block in create'
  User Create (4.1ms)  INSERT INTO "users" ("name", "email", "tel", "created_at", "updated_at") VALUES (?, ?, ?, ?, ?)  [["name", "test"], ["email", "test@example.com"], ["tel", "123123123"], ["created_at", "2022-05-29 07:58:06.395967"], ["updated_at", "2022-05-29 07:58:06.395967"]]
  ↳ app/controllers/users_controller.rb:27:in `block in create'
  TRANSACTION (0.5ms)  commit transaction
  ↳ app/controllers/users_controller.rb:27:in `block in create'
Redirected to http://localhost:3000/users/1
```

It will start to `POST` the routes `users` and then start the `TRANSACTION` to create user with command

```bash
INSERT INTO "users" ("name", "email", "tel", "created_at", "updated_at") VALUES (?, ?, ?, ?, ?)  [["name", "test"], ["email", "test@example.com"], ["tel", "123123123"], ["created_at", "2022-05-29 07:58:06.395967"], ["updated_at", "2022-05-29 07:58:06.395967"]]
```

The `create` method in model maps to `INSERT` in SQL.

#### Read

After creating a user, go back to the main page
<img src="/assets/img/1__OmOa73k4TY64SO5f__nAITA.png" alt="">

```bash
Started GET "/users" for ::1 at 2022-05-29 16:02:02 +0800
Processing by UsersController#index as HTML
  Rendering layout layouts/application.html.erb
  Rendering users/index.html.erb within layouts/application
  User Load (0.5ms)  SELECT "users".* FROM "users"
  ↳ app/views/users/index.html.erb:16
  Rendered users/index.html.erb within layouts/application (Duration: 13.1ms | Allocations: 809)
```

After we input the url in browser, it will trigger `GET` and then maps to the `index` method in `UsersController` and then trigger the SQL command:

```bash
SELECT "users".* FROM "users"
```

The `read` method maps to `SELECT` in SQL.

#### Update

Click the button, `Edit` and make some changes. In the server,

```bash
Started PATCH "/users/1" for ::1 at 2022-05-29 16:06:20 +0800
Processing by UsersController#update as HTML
  Parameters: {"authenticity_token"=>"[FILTERED]", "user"=>{"name"=>"testsssss", "email"=>"test@example.com", "tel"=>"123123123"}, "commit"=>"Update User", "id"=>"1"}
  User Load (0.7ms)  SELECT "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
  ↳ app/controllers/users_controller.rb:62:in `set_user'
  TRANSACTION (0.1ms)  begin transaction
  ↳ app/controllers/users_controller.rb:40:in `block in update'
  User Update (0.4ms)  UPDATE "users" SET "name" = ?, "updated_at" = ? WHERE "users"."id" = ?  [["name", "testsssss"], ["updated_at", "2022-05-29 08:06:20.593978"], ["id", 1]]
  ↳ app/controllers/users_controller.rb:40:in `block in update'
  TRANSACTION (1.0ms)  commit transaction
  ↳ app/controllers/users_controller.rb:40:in `block in update'
Redirected to http://localhost:3000/users/1
Completed 302 Found in 23ms (ActiveRecord: 2.2ms | Allocations: 3043)
```

The client side will trigger `PATCH` and then maps to the `update` method in `UsersController` and then trigger the SQL command, `UPDATE`, to update the information of the user

The SQL command as follow:

```bash
UPDATE "users" SET "name" = ?, "updated_at" = ? WHERE "users"."id" = ?  [["name", "testsssss"], ["updated_at", "2022-05-29 08:06:20.593978"], ["id", 1]]
```

#### Delete

Click the button, `Destroy`. Then the information in server is as follow:

```bash
Started DELETE "/users/1" for ::1 at 2022-05-29 16:11:10 +0800
Processing by UsersController#destroy as HTML
  Parameters: {"authenticity_token"=>"[FILTERED]", "id"=>"1"}
  User Load (0.8ms)  SELECT "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
  ↳ app/controllers/users_controller.rb:62:in `set_user'
  TRANSACTION (4.2ms)  begin transaction
  ↳ app/controllers/users_controller.rb:52:in `destroy'
  User Destroy (2.3ms)  DELETE FROM "users" WHERE "users"."id" = ?  [["id", 1]]
  ↳ app/controllers/users_controller.rb:52:in `destroy'
  TRANSACTION (0.8ms)  commit transaction
  ↳ app/controllers/users_controller.rb:52:in `destroy'
Redirected to http://localhost:3000/users
Completed 302 Found in 35ms (ActiveRecord: 8.1ms | Allocations: 2603)
```

After we click the destroy button, client side will trigger `DELETE` in the restful API and it maps to the `destroy` method in controller, `UsersController`, which is going to trigger the SQL command

```bash
 TRANSACTION (4.2ms)  begin transaction
  ↳ app/controllers/users_controller.rb:52:in `destroy'
  User Destroy (2.3ms)  DELETE FROM "users" WHERE "users"."id" = ?  [["id", 1]]
  ↳ app/controllers/users_controller.rb:52:in `destroy'
  TRANSACTION (0.8ms)  commit transaction
  ↳ app/controllers/users_controller.rb:52:in `destroy'
```

The `DELETE` maps the `DELETE` command in SQL.

Then we start to add `Post` model for users to add articles without scaffold.

### relational model without scaffold

Suppose this is an blog hosting app, so we need a table to store users' blog. Create migration file with

```bash
rails g migration create_posts
```

Then it will create a file to create `Post` model and table as follow:

```ruby
class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :article
      
      t.references :user, index: true, foreign_key: true # add this line because each post belongs to a user

      t.timestamps
    end
  end
end
```

After `rails db:migrate`, it will create a `posts` table. Add `Post` model in `app/models` directory and then call it in rails console, which is going to return

```bash
Post(id: integer, article: text, user_id: integer, created_at: datetime, updated_at: datetime)
```

### routes without scaffold

Given the section above, we know that the client will give inforamtion such as `UPDATE`, `GET`, ...etc to server. The way how server knows what controller method the client want is through routes. We add the routes as follow:

```ruby
Rails.application.routes.draw do
  ...
  get '/posts', to: 'posts#index' # it will maps `GET /posts` to the `index` in `PostController`
end
```

Input `rails routes` and we will see

```bash
GET /posts(.:format)    posts#index
```

Then we should can start to input `http://localhost:3000/posts` and the following error pops up, meaning we need to add `PostsController`

<img src="/assets/img/1_tw6HHhMzyY7L7rRzvWIDPQ.png" alt="">

Actually, we can have more customized routes settings

* use `only` or `except` to set the only routes we need

```ruby
Rails.application.routes.draw do  
  resources :products, only: [:index, :show]
  # or the following codes
  # resources :products, except: [:new, :create, :edit, :update, :destroy]
end
```

* use use `collection` and `member` to add sub layer for more manipulation; for example,

  * collection

```ruby
Rails.application.routes.draw do  
  resources :orders do  
    collection do  
      get :cancelled  
    end  
  end  
end
```

Then the routes: (should use code block instead of image)

<img src="/assets/img/1_YTaNYTwb6aA41Ukylqj-og.png" alt="">

There is one more route: `cancelled_orders`

* use `member` if the method will be case by case

```bash
member: xxx/id/xxx
collection: xxx/xxx
```

* we can use namespace to clearify the usage of this method and specifiy the path for this namespace

```ruby
Rails.application.routes.draw do  
  namespace :admin, path: "asdfadfaew" do # input it randomly so show it can really be anything
    resources :products  
  end  
end
```

Then the route path would be as follow:
<img src="/assets/img/1_a0_F4MMPrazMJ8PGeD7CGg.png" alt="">

* the best way to arrange routes
skip

* routes & Domain Specific Language (DSL)
skip

### controller without scaffold

With controller, we can move all the logics to model and only show necessary information on view. Add `controllers/posts_controller.rb`

```ruby
class PostsController < ApplicationController
end
```

Then the following error pops up and we need to add view for post

<img src="/assets/img/posts_index_missing_view.png" alt="">

### view without scaffold

In `views/`, add `views/posts/index.html` with following code

```html
<h1>Posts</h1>
```

### try to create a post with a user

I know there should be a mechanism to determine current user; for convenience, I will just assign user with `id = 1` as the current_user.

In `views/posts/index.html.erb`,

```html
<h1>Posts</h1>

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Article</th>
    </tr>
  </thead>

  <tbody>
    <% @posts.each do |post| %>
      <tr>
        <td><%= post.title %></td>
        <td><%= link_to 'Show', user %></td>
        <td><%= link_to 'Edit', edit_post_path(post) %></td>
        <td><%= link_to 'Destroy', post, method: :delete, data: { confirm: 'Are you sure?' } %></td>
      </tr>
    <% end %>
  </tbody>
</table>

<br>

<%= link_to 'New Post', new_post_path %>
```

Then errors pops up to ask us add method for post listing, new post adding, and post creation, so as follow:

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def create
    
  end
end

####

Rails.application.routes.draw do
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/posts', to: 'posts#index'
  get '/posts/new', to: 'posts#new', as: :new_post
  # post '/posts', to: 'posts#create'
end
```

(to be continued)

### style

## Reference
