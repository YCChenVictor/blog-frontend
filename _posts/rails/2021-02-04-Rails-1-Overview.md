---
layout: post
title: >-
  (Rails_1) Overview
date: '2021-02-04T10:38:37.553Z'
categories: rails
state: to be continued
---

## Introduction
skip

## Why
skip

## How
The following steps show how to build a basic app with most basic commands within rails. The steps as follow: 
1. Installation
2. Start A Project
3. Scaffold
4. Migration
5. CRUD
6. Relational

`$` means input the coding into terminal.

### Installation
```
$ gem install rails -v 5.1.1
```
The code above will install the rails version, 5.1.1

#### Check rails version
```
$ rails -v
```

### Start A Project
```
$ rails new app_name
```
If you want to create rails project with particular version, then
```
$ rails _3.2.14_ new app_name
```
;after the creation, please `cd` into the project directory and start the server with
```
$ rails s 
```
<img src="/assets/img/rails_server_start.png" alt="rails_server_start">

open browsers and input `http://localhost:3000`

<img src="/assets/img/rails_start_page.png" alt="rails_start_page">

先到這邊好了

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