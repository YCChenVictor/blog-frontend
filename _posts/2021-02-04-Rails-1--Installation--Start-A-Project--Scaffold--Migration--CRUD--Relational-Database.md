---
layout: post
title: >-
  (Rails_1) Installation, Start A Project, Scaffold, Migration, CRUD, Relational
  Database
date: '2021-02-04T10:38:37.553Z'
categories: rails
note: none
---

### Install

#### Install through Gem

$ gem install rails -v 5.1.1

#### Check rails version

$ rails -v

### Start A Project

#### Create rails project with newest version

```
$ rails new app_name
```

#### Create rails project with particular version

```
$ rails _3.2.14_ new app_name
```

#### Check whether it is built

1.  cd into the project directory
2.  start the server

```
$ rails s 
```

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__vv3iL6uoDA59vwFZWe7__UA.png)

3\. open browsers and input ‘http://localhost:3000’

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__v48M__Mcco97tCjUt6Pilag.png)

### Scaffold

Scaffold in rails is a quick way to create MVC structure. If you want to create a MVC structure with DataBase, User (name(string), email(string), tel(string)), cd into the project directory and then type following code in terminal

```
$ rails g scaffold User name:string email:string tel:string
```

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__p5eI09hN9pyvsxCo102__nw.png)

### Migration

After the step of scaffold, we need to use migration to create the tables we want in database. Input the following code

```
$ rails db:migrate
```

The file (ex: 20210204105628\_create\_users.rb) to create the tables is as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__UQZ9f5TDYy2MpzaBUt__N8w.png)

After migration, start the server again

```
$ rails s
```

And input the website: [http://localhost:3000/users](http://localhost:3000/users) in browser. Then the following main page:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____Yp2j7kic__5QHtdcRC2X8g.png)

### CRUD

CRUD means ‘Create’, ‘Read’, ‘Update’, ‘Delete’. This four basic function created through above codes. Let us try the functions in website.

#### Create

Click the New User in main page. Then the following webpage pops up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__D9wMcZ5NloIWuuY16__z34g.png)

#### Read

After creating a user, go back to the main page

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__OmOa73k4TY64SO5f__nAITA.png)

#### Update

Click the Edit

#### Delete

Click the Destroy

### Relational Database in Rails

#### Create blog CRUD for users

```
$ rails g scaffold Post title:string content:text is_available:boolean user:references
```

The user:references makes this model to connect to the pre-built model, Users

#### Migrate again

```
$ rails db:migrate
```

### Reference

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)