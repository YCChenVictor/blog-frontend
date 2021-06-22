---
layout: post
title: (Rails_8) CRUD details without scaffold
date: '2021-02-26T08:53:42.587Z'
categories: rails
slug: /@t5204713910/rails-8-crud-details-without-scaffold-c47ec5026c53
note: Add Controller for Updating (13) -> Add Controller for Deleting
  (14) -> Add Routes for Voting (15) -> Add Method for Voting (16)
---

### General Concept:

CRUD means Create, Read, Update, Delete. For rails, we can use following code to build all related stuff:

```
rails generate scaffold User name:string email:string tel:string
```

Then it will generate a model named User with name, email, tel column name

In railsbook, the example is voting system. Let’s review the basic structure of Route-MVC structure

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__GiaX4WZaeQLinrmcAhhL6g.png)

### Add Controller for Updating (13)

After we click the update button in the edit webpage, the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ycg4YTOOleO02EehL2b__Yw.png)

Which means it cannot find the update method, so we are going to add one in app/controllers/candidates\_controller.rb

def update  
  [@candidate](http://twitter.com/candidate "Twitter profile for @candidate") = Candidate.find\_by(id: params\[:id\])  
  if [@candidate](http://twitter.com/candidate "Twitter profile for @candidate").update(candidate\_params)  
    redirect\_to candidates\_path, notice: "successfully updating!"  
  else  
    render :edit  
  end  
end

### Add Controller for Deleting (14)

In the main page, if we click the delete button, the following error occurs, which means it cannot find the delete method

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__1YKD4__DUXueI11Yac8HvOg.png)

Then, we can build one. Add following method in app/controllers/candidates\_controller.rb

def destroy  
  @candidate = Candidate.find\_by(id: params\[:id\])  
  @candidate.destroy if @candidate  
  redirect\_to candidates\_path, notice: "Successfully deleted!"  
end

### Add Routes for Voting (15)

We can click the vote button and nothing happened

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__1tw5U2sXD__zDf3N1aeR2Ng.png)

we need to add route first. In config/route.rb add

Rails.application.routes.draw do  
  resources :candidates do  
    member do  
      post :vote  
    end  
  end  
end

then we can check the routes with

$ rails routes

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__rdEwnVo__69GU4NNyftUL6A.png)

There is a new route called `vote_candidate` With this route, we can change add url to app/views/index.html.erb from

<td><%= link\_to "Vote", "#" %></td>

to

<td><%= link\_to "Vote", vote\_candidate\_path(candidate), method: "post", data: { confirm: "are you sure?" } %></td>

### Add Method for Voting (16)

Then let’s click the vote button for testing and the following error pops up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__2HcbGsS2Pf9NReFQaSlFUA.png)

which means we do not have method, vote, so we can create one

def vote  
  @candidate = Candidate.find\_by(id: params\[:id\])  
  @candidate.increment(:votes)  
  @candidate.save  
  redirect\_to candidates\_path, notice: "Vote!"  
end

### reference:

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)