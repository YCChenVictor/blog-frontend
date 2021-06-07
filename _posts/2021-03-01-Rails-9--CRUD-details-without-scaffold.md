---
title: (Rails_9) CRUD details without scaffold
description: 'The steps: Add model for Voting (17) -> Solve N+1 Problem (18)'
date: '2021-03-01T05:38:03.822Z'
categories: []
keywords: []
slug: /@t5204713910/rails-9-crud-details-without-scaffold-83b3f39b66de
---

### General Concept:

CRUD means Create, Read, Update, Delete. For rails, we can use following code to build all related stuff:

rails generate scaffold User name:string email:string tel:string

Then it will generate a model named User with name, email, tel column name

In railsbook, the example is voting system. Let’s review the basic structure of Route-MVC structure

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/0__3Oo6O__VuvbpBMHrR.png)

### Add model for Voting (17)

After we create the vote method in the candidate controller, to avoid frauds, we should do more in vote. As a result, we are going to create a model specifically for vote logging with three information:

1.  the voting time
2.  vote to whom
3.  the voter’s ip address

The following code can create a model for vote with 3 columns, timestamp, candidate and ip\_address

$ rails generate model vote\_log candidate:references ip\_address:string

and then migrate it

$ rails db:migrate

Then we need to define the connection between models, in app/models/candidate.rb modify the code into

class Candidate < ApplicationRecord  
  has\_many :vote\_logs, dependent: :destroy  
end

which means a candidate can has many vote\_log and `dependent: :destroy` means this vote\_logs can be delete after the candidate being deleted

Because in generate model part, we add column, candidate with references, the model of vote will have a belongs\_to method

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__QZrj3tPTN8U4x6vMYEXXEQ.png)

Then, modify method, vote, in app/controllers/candidates\_controller.rb so that after voting, the three information we want will be add into vote\_logs table, the method is as follow:

def vote  
  @candidate = Candidate.find\_by(id: params\[:id\])  
  @candidate.vote\_logs.create(ip\_address: request.remote\_ip) if @candidate  
  redirect\_to candidates\_path, notice: "vote accomplished!"  
end

After modifying this method, use `rails console` to check whether the voting record written in database

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__u__6xcLo1L1h__UHnFOSIWkg.png)

which verifies successfully inserting data into vote log. Then, modify the app/views/candidates/index.html.erb from

<td><%= candidate.votes %></td>

to

<td><%= candidate.vote\_logs.count %></td>

#### The concept of notice

open app/controllers/candidates\_controller.rb. There are notice in methods, CRUD. We can add this notice to app/views/layouts/application.tml.erb from

<body>  
  <%= yield %>  
</body>

to

<body>  
  <%= notice %>  
  <%= yield %>  
</body>

which is going to pop up notice after CRUD.

### Solve N+1 Problem (18)

The main page is as follow:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__HOz__H2u9AH3hINfXOFyf4Q.png)

and the log is as follow:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__MtuyUY0et73BpCsKcB__Z__Q.png)

which means with 2 candidates, there are 3 SELECT to database, causing efficiency problem. We are going to change it into 1 query. In rails, we solve it with Counter Cache.

#### Counter Cache

It is to cache the number of vote into candidates model rather than in VoteLog model so it will not query the number of vote from VoteLog with a lot of query but only query the number of vote from candidates database.

As rails [Active Record Migrations](https://guides.rubyonrails.org/active_record_migrations.html) noted:

> If the migration name is of the form “AddColumnToTable” or “RemoveColumnFromTable” and is followed by a list of column names and types then a migration containing the appropriate `[add_column](https://api.rubyonrails.org/v6.1.3/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_column)` and `[remove_column](https://api.rubyonrails.org/v6.1.3/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-remove_column)` statements will be created.

Because we want to add a column to count votes in candidate model, we can us following migration

rails generate migration add\_counter\_to\_candidate vote\_logs  
\_count:integer

which is going to add a vote\_logs\_count into candidate model with migration, AddCounterToCandidate

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__g10yu__KJvGZBEoiInOuIEA.png)

Then start migration

rails db:migrate

and add `counter_cache: true` in app/models/vote\_log.rb

class VoteLog < ApplicationRecord  
  belongs\_to :candidate, counter\_cache: true  
end

Then change app/views/candidates/index.html.erb from

<td><%= candidate.vote\_logs.count %></td>

to

<td><%= candidate.vote\_logs.size %></td>

Then it will query only once

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ILLD40yar1sr0KBfJGtlxA.png)

### Reference:

[**Active Record Migrations - Ruby on Rails Guides**  
_Active Record MigrationsMigrations are a feature of Active Record that allows you to evolve your database schema over…_guides.rubyonrails.org](https://guides.rubyonrails.org/active_record_migrations.html "https://guides.rubyonrails.org/active_record_migrations.html")[](https://guides.rubyonrails.org/active_record_migrations.html)

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)