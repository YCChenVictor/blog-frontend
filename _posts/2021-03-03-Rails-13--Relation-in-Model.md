---
title: (Rails_13) Relation in Model
description: 'one-to-one, one-to-many, many-to-many, HABTM'
date: '2021-03-03T06:04:13.493Z'
categories: []
keywords: []
slug: /@t5204713910/rails-13-relation-in-model-ab8377267982
---

There are three types of relation in model, one-to-one, one-to-many, many-to-many

For example, if we want to build an online store system. The relations:

1.  one-to-one: every user can create one store
2.  one-to-many: a store can sell many product
3.  many-to-many: Each store can sell many products and each product can be sold in many stores

### one-to-one

Lets build User Model

$ rails g model User name email tel

Then build Store Model

$ rails g model Store title tel address user\_id:integer

In the generate of Store, `user_id:integer` used as foreign key to match id in User database.

Then

$ rails db:migrate

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__UcS6Mtj0CLEY5dsfGnY5TA.png)

Then setting relation as follow

In user

class User < ApplicationRecord  
  has\_one :store  
end

In store

class Store < ApplicationRecord  
  belongs\_to :user  
end

Then we can use model to manipulate database with model as follow

#### **Create user**

user1 = User.new(name: "aaa")

#### **Create store**

store1 = Store.new(title: "aaa")

#### **Point store to user.store**

user1.store = store1

#### **save it**

user1.save

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__4____gMZvS0GRwn01ADm__BGA.png)

### one-to-many

Let’s build Product model

rails g model Product name description:text price:decimal is\_available:boolean store\_id:integer

and

rails db:migrate

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__oP9w1ETe5aCdLpGVaHMuvw.png)

Then add the relation in model

In store

class Store < ApplicationRecord  
  belongs\_to :user  
  has\_many :products  
end

In product

class Product < ApplicationRecord  
  belongs\_to :store  
end

#### **Create products**

product1 = Product.new(name: "aaa", price: 100)  
product2 = Product.new(name: "bbb", price: 200)

#### **Appoint store**

store1 = Store.first

#### **move product into store**

store1.products = \[product1, product2\]

### many-to-many

#### **Create WareHouse for the following relation**

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__skqUNFZZ2K721CheqeKqUw.png)

Then through warehouse, store and product have the many-to-many relation

$ rails g model WareHouse store:references product:references

Then

$ rails db:migrate

Then in Store

class Store < ApplicationRecord  
  belongs\_to :user  
    
  has\_many :ware\_houses  
  has\_many :products, through: :ware\_houses  
end

and in Product

class Product < ApplicationRecord  
  belongs\_to :store  
  has\_many :stores, through: :ware\_houses  
end

Then the relation:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__5uu__eoVOcShF4bYAryrKTw.png)

#### HABTM (has\_and\_belongs\_to\_many)

To deal with many-to-many structure, there is another way to set the model. For example, we can rewrite store and product into

**Store**

class Store < ApplicationRecord  
  has\_and\_belongs\_to\_many :products  
end

**Product**

class Product < ApplicationRecord  
  has\_and\_belongs\_to\_many: stores  
end

Notice, because there is no command to specify the middle table, warehouse, by default, rails will looking for products\_stores.

We can reset the above models and do migration again.

$ rails g migration create\_join\_table\_for\_store\_and\_product

There will be no model called products\_stores in rails project, meaning we cannot do modification through rails model but with rails console or modifying it with SQL directly. As a result, if we want to do some special analysis to the third model, HABTM is worse than above method.

### Add Relations Explicitly

If we found that a model should have relation with another model and both models have been created,

#### add reference

For example, if we want to add reference to model, Post with model, User. Then,

```
rails g migration AddUserToPosts user:references
```

Rails will create

class AddUserToPosts < ActiveRecord::Migration\[6.1\]  
  def change  
    add\_reference :posts, :user, null: false, foreign\_key: true  
  end  
end

in `db/migrate`

### Reference

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)