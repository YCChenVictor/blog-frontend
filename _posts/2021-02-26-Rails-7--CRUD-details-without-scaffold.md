---
layout: post
title: (Rails_7) CRUD details without scaffold
date: '2021-02-26T07:34:09.150Z'
categories: rails
note: Add Button in View for Data Editing (10) -> Add View for Data
  Editing (11) -> Add Controller for Data Editing (12)
---

### General Concept:

CRUD means Create, Read, Update, Delete. For rails, we can use following code to build all related stuff:

```
rails generate scaffold User name:string email:string tel:string
```

Then it will generate a model named User with name, email, tel column name

In railsbook, the example is voting system. Let’s review the basic structure of Route-MVC structure

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__GiaX4WZaeQLinrmcAhhL6g.png)

### Add Button in View to Link to Data Editing Page (10)

Open app/views/index.html.erb, add some “link\_to”

<h1>Candidates List</h1>  
  <%= link\_to "Add Candidates", new\_candidate\_path %>

<table>  
    
  <thead>  
    <tr>  
      <td>Vote</td>  
      <td>Candidate Name</td>  
      <td>Party</td>  
      <td>Presentation</td>  
      <td>Number of Votes</td>  
      <td>Move</td>  
    </tr>  
  </thead>

<tbody>    
    <% [@candidates](http://twitter.com/candidates "Twitter profile for @candidates").each do |candidate| %>    
      <tr>  
       <td><%= link\_to "Vote", "#" %></td>  
        <td><%= candidate.name %>(Age:<%= candidate.age %> years old)</td>  
        <td><%= candidate.party %></td>  
        <td><%= candidate.politics %></td>  
        <td><%= candidate.votes %></td>  
        <td>  
          <%= link\_to "edit", edit\_candidate\_path(candidate) %>  
          <%= link\_to "delete", candidate\_path(candidate), method: "delete", data: { confirm: "delete confirmation" } %></td>  
      </tr>    
    <% end %>    
  </tbody>

</table>

The meaning of three new added link\_to coding

<%= link\_to "Vote", "#" %>

which means it will show text, Vote and then link to url, #

<%= link\_to "edit", edit\_candidate\_path(candidate) %>

which means it will show text, edit and then link to url edit\_candidate\_path(candidate), the url to edit particular candidate

<%= link\_to "delete", candidate\_path(candidate), method: "delete", data: { confirm: "delete confirmation" } %>

which means it will show text, delete, and link to url, candidate\_path(candidate). The method: “delete” means to delete this data and the confirm: “delete confirmation” means popping up a confirmation to check whether to delete the data or not.

Then the homepage will be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Az4I6EWg9Ijj6hmElhAapw.png)

### Add View for Data Editing Webpage (11)

After we click the edit button in main page, an empty page pops up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__fKjhboiuzpdoy37n6Zwhpw.png)

which means the edit html file is empty, so we can add following html coding in app/views/edit.html.erb

<h1>Edit Candidates</h1>

<%= form\_for(@candidate) do |f| %>  
  <%= f.label :name, "name" %>  
  <%= f.text\_field :name %> <br />

  <%= f.label :age, "age" %>  
  <%= f.text\_field :age %> <br />

  <%= f.label :party, "party" %>  
  <%= f.text\_field :party %> <br />

  <%= f.label :politics, "presentation" %>  
  <%= f.text\_area :politics %> <br />

  <%= f.submit %>  
<% end %>

<br />  
<%= link\_to 'back to candidates list', candidates\_path %>

Then the following error pops up

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__auieY0BCGDpfW33N2Wjl0w.png)

which means it cannot find the @candidate from the method. As a result, we are going to add this method in controller

### Add Controller for Data Editing Webpage (12)

In app/controllers/candidates\_controller.rb, add method

def edit  
  @candidate = Candidate.find\_by(id: params\[:id\])  
end

It will find the data of particular id and feed it into the edit webpage as following

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__wx1__PhJ75uyxF1TPDPWcig.png)

#### Combine Edit and Add html file

Notice, the html coding of edit and add are almost the same, so we can combine them together with following steps:

first, create a file called \_form.html.erb to save the same coding of edit and add

<%= form\_for(candidate) do |f| %>  
  <%= f.label :name, "name" %>  
  <%= f.text\_field :name %> <br />

<%= f.label :age, "age" %>  
  <%= f.text\_field :age %> <br />

<%= f.label :party, "party" %>  
  <%= f.text\_field :party %> <br />

<%= f.label :politics, "presentation" %>  
  <%= f.text\_area :politics %> <br />

<%= f.submit %>  
<% end %>

And change the coding of new.html.erb into

<h1>Add Candidate</h1>  
<%= render "form", candidate: @candidate %>  
<br />  
<%= link\_to 'back to candidates list', candidates\_path %>

the coding of edit.html.erb into

<h1>Edit Candidate</h1>  
 <%= render "form", candidate: @candidate %>  
 <br />  
 <%= link\_to 'back to candidates list', candidates\_path %>

Notice, the the variable in \_form.html.erb is candidate but not @candidate. That is, we want the variables in \_form.html.erb to be fed so that we can use any name in other file but uniform name in the combined file, \_form.html.erb

### reference:

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)