---
layout: post
title: (Rails_5) CRUD details without scaffold  
date: '2021-02-26T04:18:25.484Z'
categories: rails
note: Modify Route (1) -> Add Controller (2) -> Add Method (3) -> Add
  Model (4) -> Migration (5) -> Add View (6)
---

### General Concept

CRUD means Create, Read, Update, Delete. For rails, we can use following command to build all related stuff:

```
rails generate scaffold User name:string email:string tel:string
```

Then it will generate a model named User with columns: name, email, tel

In railsbook, the example is voting system. Let’s review the basic structure of Route-MVC structure

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__GiaX4WZaeQLinrmcAhhL6g.png)

### Modify Route (1)

In /config/route.rb, add`resources`for routes creating

Rails.application.routes.draw do  
  resources :candidates  
end

The input the following to see the routes

rails routes

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Eso6TT0MPJ32nNUU2TtPYw.png)

There are 8 routes related to candidates

### Add Controller (2)

After we create routes, if we open the route, candidates, the following error occur

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____zJ__7YfMJ6T2Dt7__1hl0NA.png)

which means we should add controller. The method is as follow:

$ rails generate controller candidates

### Add method (3)

After we add controller, the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__G0m3zoXz8WTC0X1B9v3OQQ.png)

which means we need to add method, index, in app/controllers/candidates\_controller.rb

class CandidatesController < ApplicationController  
  def index  
    [@candidates](http://twitter.com/candidates "Twitter profile for @candidates") = Candidate.all  
  end  
end

### Add Model (4)

After we add method in controller, we will get the following error

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__fX0dDWho4vvzlU2ykBLQeQ.png)

which means we need to build model with following code

rails generate model candidate name party age:integer politics:text votes:integer

### Migration (5)

After we add model, the following code occur

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__xJgh0Y36oZTwtHjTbzRS1A.png)

which means we need to migrate database with following code

$ rails db:migrate

### Add Views (6)

After we migrate database, the following code occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Wyp0AcUWDYN42uX7b10Ywg.png)

In app/views/candidates, add the following three files

1.  index.html.erb (template to list all candidates)
2.  new.html.erb (template to add new candidate)
3.  edit.html.erb (template to edit candidate)

The name of html is according to **actions;** for example, if action name is index, the file name should be index.html.erb

In **index.html.erb**, add the following code

<h1>Candidates List</h1>  
<%= link\_to "Add Candidates", new\_candidate\_path %>  
<table>  
<thead>  
<tr>  
<td>Candidate Name</td>  
<td>Party</td>  
<td>Presentation</td>  
<td>Votes</td>  
</tr>  
</thead>  
<tbody>  
<% [@candidates](http://twitter.com/candidates "Twitter profile for @candidates").each do |candidate| %>

<tr>  
<td><%= candidate.name %>(Age:<%= candidate.age %> years old)</td>  
<td><%= candidate.party %></td>  
<td><%= candidate.politics %></td>  
<td><%= candidate.votes %></td>  
</tr>  
<% end %>  
</tbody>  
</table>

Then the following website shows up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__LGq9ct6M4IvdC6tlmEaFFg.png)

### Reference:

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)