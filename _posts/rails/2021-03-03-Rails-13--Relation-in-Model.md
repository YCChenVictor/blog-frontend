---
layout: post
title: (Rails_Elementary_13) Relation in Model
date: '2021-03-03'
categories: rails
keywords: []
note: 'one-to-one, one-to-many, many-to-many, HABTM'
---

There are three types of relation in model: one-to-one, one-to-many, many-to-many

For example, if we want to build an online store system. The relations:

1.  one-to-one: every user can create one store
2.  one-to-many: a store can sell many product
3.  many-to-many: Each store can sell many products and each product can be sold in many stores

### one-to-one

Let's build User Model
```
$ rails g model User name email tel
```
Then build Store Model
```
$ rails g model Store title tel address user\_id:integer
```
In the generate of Store, `user_id:integer` used as foreign key to match id in User database.

Then
```
$ rails db:migrate
```
<img src="/assets/img/1__UcS6Mtj0CLEY5dsfGnY5TA.png" alt="">

Then setting relation as follow

In user model
```
class User < ApplicationRecord  
  has_one :store  
end
```
In store model
```
class Store < ApplicationRecord  
  belongs_to :user  
end
```
Then we can use model to manipulate database with model as follow

#### **Create user**
```
user1 = User.new(name: "aaa")
```
#### **Create store**
```
store1 = Store.new(title: "aaa")
```
#### **Point store to user.store**
```
user1.store = store1
```
#### **save it**
```
user1.save
```
<img src="/assets/img/1__4____gMZvS0GRwn01ADm__BGA.png" alt="">

### one-to-many

Let’s build Product model
```
$ rails g model Product name description:text price:decimal is_available:boolean store_id:integer
```
and
```
$ rails db:migrate
```
<img src="/assets/img/1__oP9w1ETe5aCdLpGVaHMuvw.png" alt="">

Then add the relation in model

In store model,
```
class Store < ApplicationRecord  
  belongs_to :user  
  has_many :products  
end
```
In product model
```
class Product < ApplicationRecord  
  belongs_to :store  
end
```
#### **Create products**
```
product1 = Product.new(name: "aaa", price: 100)  
product2 = Product.new(name: "bbb", price: 200)
```
#### **Appoint store**
```
store1 = Store.first
```
#### **move product into store**
```
store1.products = [product1, product2]
```
### many-to-many

#### **Create WareHouse for the following relation**
<img src="/assets/img/1__skqUNFZZ2K721CheqeKqUw.png" alt="">

Then through warehouse, store and product have the many-to-many relation
```
$ rails g model WareHouse store:references product:references
```
Then
```
$ rails db:migrate
```
Then in Store model
```
class Store < ApplicationRecord  
  belongs_to :user  
    
  has_many :ware_houses  
  has_many :products, through: :ware_houses  
end
```
and in Product

class Product < ApplicationRecord  
  belongs_to :store  
  has_many :stores, through: :ware_houses  
end

Then the relation:
<img src="/assets/img/1__5uu__eoVOcShF4bYAryrKTw.png" alt="">

#### HABTM (has_and_belongs_to_many)

To deal with many-to-many structure, there is another way to set the model. For example, we can rewrite store and product into

**Store**
```
class Store < ApplicationRecord  
  has_and_belongs_to_many :products  
end
```
**Product**
```
class Product < ApplicationRecord  
  has_and_belongs_to_many: stores  
end
```
Notice, because there is no command to specify the middle table, warehouse, by default, rails will looking for products_stores.

We can reset the above models and do migration again.
```
$ rails g migration create_join_table_for_store_and_product
```
With `HABTM`, there will be no `warehouse` model for us to do more model manipulation.

### Add Relations Explicitly

If we found that a model should have relation with another model and both models have been created,

#### add reference

For example, if we want to add reference to model, Post with model, User. Then,

```
$ rails g migration AddUserToPosts user:references
```

Rails will create
```
class AddUserToPosts < ActiveRecord::Migration[6.1]  
  def change  
    add_reference :posts, :user, null: false, foreign_key: true  
  end  
end
```
in `db/migrate`

### Reference

[**為你自己學 Ruby on Rails 高見龍**]("https://railsbook.tw/")