---
layout: post
title: (Rails Elementary 3) CRUD details without scaffold  
date: '2021-02-26T04:18:25.484Z'
categories: rails
note:
---

## General Concept

CRUD means Create, Read, Update, Delete. In rails, we can use following command to build all related stuff:

```bash
rails generate scaffold User name:string email:string tel:string
```

Then it will generate a model named `User` with columns: `name, email, tel`

In railsbook, the example is voting system. Let’s review the basic structure of Route-MVC structure
<img src="/assets/img/1__GiaX4WZaeQLinrmcAhhL6g.png" alt="">

I am going to follow the steps: Modify Route (1) -> Add Controller (2) -> Add Method (3) -> Add Model (4) -> Migration (5) -> Add View (6) -> Add View for Data Adding Page (7) -> Add Controller for Data Adding Page (8) -> Add Controller for Data Creating (9) -> Add Button in View for Data Editing (10) -> Add View for Data Editing (11) -> Add Controller for Data Editing (12) -> Add Controller for Updating (13) -> Add Controller for Deleting (14) -> Add Routes for Voting (15) -> Add Method for Voting (16) -> Add model for Voting (17) -> Counter Cache (18) -> Neat Controller (19) -> Use Bootstrap (20)

### Modify Route (1)

In `/config/route.rb`, add `resources` for routes creating
```
Rails.application.routes.draw do  
  resources :candidates
end
```
Then input the following to see the routes
```
$ rails routes
```
<img src="/assets/img/1__Eso6TT0MPJ32nNUU2TtPYw.png" alt="">

There are 8 routes related to candidates

## Add Controller (2)

After creating routes, if we try to GET candidates, the following error occur
<img src="/assets/img/1____zJ__7YfMJ6T2Dt7__1hl0NA.png" alt="">

which means we should add controller. The method is as follow:
```
$ rails generate controller candidates
```
### Add method (3)

After we add controller, the following error occurs
<img src="/assets/img/1__G0m3zoXz8WTC0X1B9v3OQQ.png" alt="">

which means we need to add method, index, in `app/controllers/candidates_controller.rb`
```
class CandidatesController < ApplicationController  
  def index  
    @candidates = Candidate.all  
  end  
end
```
### Add Model (4)

After we add method in controller, we will get the following error
<img src="/assets/img/1__fX0dDWho4vvzlU2ykBLQeQ.png" alt="">

which means we need to build model with following code
```
$ rails generate model candidate name party age:integer politics:text votes:integer
```
### Migration (5)

After we add model, the following code occur
<img src="/assets/img/1__xJgh0Y36oZTwtHjTbzRS1A.png" alt="">

which means we need to migrate database with following code
```
$ rails db:migrate
```

### Add Views (6)

After we migrate database, the following code occurs
<img src="/assets/img/1_Wyp0AcUWDYN42uX7b10Ywg.png" alt="">

In `app/views/candidates`, add the following three files

1.  index.html.erb (template to list all candidates)
2.  new.html.erb (template to add new candidate)
3.  edit.html.erb (template to edit candidate)

The name of html is according to **actions** in routes; for example, if action name is index, the file name should be `index.html.erb`

In `index.html.erb`, add the following code
```
<h1>Candidates List</h1>  
<%= link_to "Add Candidates", new_candidate_path %>  
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
    <% @candidates.each do |candidate| %>
      <tr>  
      <td><%= candidate.name %>(Age:<%= candidate.age %> years old)</td>  
      <td><%= candidate.party %></td>  
      <td><%= candidate.politics %></td>  
      <td><%= candidate.votes %></td>  
      </tr>  
    <% end %>  
  </tbody>  
</table>
```
Then the following website shows up
<img src="/assets/img/1_LGq9ct6M4IvdC6tlmEaFFg.png" alt="">

### Add View for Data Adding Page (7)

If we click Add Candidates, empty website pops up. We need to edit `new.html.erb` in `app/views/new.html.erb`. Open it and input following
```
<h1>Add Candidates</h1>

<%= form_for(@candidate) do |f| %> 
  <%= f.label :name, "name" %>  
  <%= f.text_field :name %>
  <br />
  <%= f.label :age, "age" %>  
  <%= f.text_field :age %>
  <br />
  <%= f.label :party, "party" %>  
  <%= f.text_field :party %>
  <br />
  <%= f.label :politics, "Presentation" %>  
  <%= f.text_area :politics %> <br />
  <%= f.submit %>  
<% end %>
<br />  
<%= link_to 'back to candidates list', candidates_path %>
```
Then the following error occurs
<img src="/assets/img/1__3OJ7p82sd0f6jrYiUIxfUQ.png" alt="">

Which means we need to add method in controller because it cannot find @candidate

### Add Controller for Data Adding Page (8)

In app/controllers/candidates_controller.rb, add the method, new
<img src="/assets/img/1__KxuzNa4CPj4mPCje9gmqUg.png" alt="">

then the website looks like
<img src="/assets/img/1__9gkmGuQfCd3qCSsKbS6Uaw.png" alt="">

### Add Controller for Data Creation (9)

Then we can try to input some data from creating, the following error occurs
<img src="/assets/img/1__NCl45uHRfgwS35LlDAu9__Q.png" alt="">

which means there is no method called create in controller.

In `app/controllers/candidates_controller.rb` add the following method
```
def create      
  @candidate = Candidate.new(params[:candidate])  
    
  if @candidate.save
    redirect_to candidates_path, notice: "add candidate successfully!"  
  else
    render :new
  end
end
```
Notice, if fail to create new data, the webpage will `render :new` but not `redirect_to :new`. Why? If we use redirect_to, after failing, the website will return to new method with all the input data washed. But the render means showing the `new` page with data unchanged.

Then trying the create button. The following error occurs
<img src="/assets/img/1_zP1u9zAg8y79pVcggLAYcA.png" alt="">

Rails trying to tell us that we should not input the whole params[:candidate] into the website, causing security risk. As a result, adding a method to filter data and then input into website:

In `app/controllers/candidates_controller.rb`

```
private  
def candidate_params  
  params.require(:candidate).permit(:name, :age, :party, :politics)  
end
```
Notice, the `private` will turn all method below `private` into private

Then change the following code in method, `create` from
```
@candidate = Candidate.new(params[:candidate])
```
to
```
@candidate = Candidate.new(candidate_params)
```

### Add Button in View to Link to Data Editing Page (10)

Open `app/views/index.html.erb`, add some `link_to`
```
<h1>Candidates List</h1>  
  <%= link_to "Add Candidates", new_candidate_path %>

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
    <% @candidates.each do |candidate| %>    
      <tr>  
       <td><%= link_to "Vote", "#" %></td>  
        <td><%= candidate.name %>(Age:<%= candidate.age %> years old)</td>  
        <td><%= candidate.party %></td>  
        <td><%= candidate.politics %></td>  
        <td><%= candidate.votes %></td>  
        <td>  
          <%= link_to "edit", edit_candidate_path(candidate) %>  
          <%= link_to "delete", candidate_path(candidate), method: "delete", data: { confirm: "delete confirmation" } %></td>  
      </tr>    
    <% end %>    
  </tbody>

</table>
```
The meaning of three new added link_to coding
```
<%= link_to "Vote", "#" %>
```
which means it will show text, Vote and link to url, #
```
<%= link_to "edit", edit_candidate_path(candidate) %>
```
which means it will show text, edit and link to url edit_candidate_path(candidate), the url to edit particular candidate
```
<%= link_to "delete", candidate_path(candidate), method: "delete", data: { confirm: "delete confirmation" } %>
```
which means it will show text, delete, and link to url, candidate_path(candidate). The method: `delete` means to delete this data and the confirm: `delete confirmation` means popping up a confirmation to check whether to delete the data or not.

Then the homepage will be
<img src="/assets/img/1__Az4I6EWg9Ijj6hmElhAapw.png" alt="">

### Add View for Data Editing Webpage (11)

After we click the edit button in main page, an empty page pops up
<img src="/assets/img/1__fKjhboiuzpdoy37n6Zwhpw.png" alt="">

which means the edit html file is empty, so we add following html coding in `app/views/edit.html.erb`
```
<h1>Edit Candidates</h1>

<%= form_for(@candidate) do |f| %>  
  <%= f.label :name, "name" %>  
  <%= f.text_field :name %> <br />

  <%= f.label :age, "age" %>  
  <%= f.text_field :age %> <br />

  <%= f.label :party, "party" %>  
  <%= f.text_field :party %> <br />

  <%= f.label :politics, "presentation" %>  
  <%= f.text_area :politics %> <br />

  <%= f.submit %>  
<% end %>

<br />  
<%= link_to 'back to candidates list', candidates_path %>
```
Then the following error pops up
<img src="/assets/img/1__auieY0BCGDpfW33N2Wjl0w.png" alt="">

which means it cannot find the @candidate from the method. As a result, we are going to add this method in controller

### Add Controller for Data Editing Webpage (12)

In `app/controllers/candidates_controller.rb`, add method
```
def edit  
  @candidate = Candidate.find_by(id: params[:id])  
end
```
It will find the data of particular id and feed it into the edit webpage as following
<img src="/assets/img/1__wx1__PhJ75uyxF1TPDPWcig.png" alt="">

#### Combine Edit and Add html file

Notice, the html of edit and add are almost the same, so we can combine them together with following steps:

first, create a file called _form.html.erb to save the same coding of edit and add
```
<%= form_for(candidate) do |f| %>  
  <%= f.label :name, "name" %>  
  <%= f.text_field :name %> <br />

<%= f.label :age, "age" %>  
  <%= f.text_field :age %> <br />

<%= f.label :party, "party" %>  
  <%= f.text_field :party %> <br />

<%= f.label :politics, "presentation" %>  
  <%= f.text_area :politics %> <br />

<%= f.submit %>  
<% end %>
```
And change `new.html.erb` into
```
<h1>Add Candidate</h1>  
<%= render "form", candidate: @candidate %>  
<br />  
<%= link_to 'back to candidates list', candidates_path %>
```
and change `edit.html.erb` into
```
<h1>Edit Candidate</h1>  
 <%= render "form", candidate: @candidate %>  
 <br />  
 <%= link_to 'back to candidates list', candidates_path %>
```
Notice, the variable in `_form.html.erb` is candidate but not `@candidate`. We can use any other name in other file but uniform name in the combined file, `_form.html.erb`.

### Add Controller for Updating (13)

After we click the update button in the edit webpage, the following error occurs
<img src="/assets/img/1__ycg4YTOOleO02EehL2b__Yw.png" alt="">

Which means it cannot find the update method, so we are going to add one in `app/controllers/candidates_controller.rb`
```
def update  
  @candidate = Candidate.find_by(id: params[:id])  
  if @candidate.update(candidate_params)  
    redirect_to candidates_path, notice: "successfully updating!"  
  else  
    render :edit
  end
end
```
### Add Controller for Deleting (14)

In the main page, if we click the delete button, the following error occurs, which means it cannot find the delete method
<img src="/assets/img/1__1YKD4__DUXueI11Yac8HvOg.png" alt="">

Then, add following method in `app/controllers/candidates_controller.rb`
```
def destroy  
  @candidate = Candidate.find_by(id: params[:id])  
  @candidate.destroy if @candidate  
  redirect_to candidates_path, notice: "Successfully deleted!"  
end
```
### Add Routes for Voting (15)

We can click the vote button and nothing happened
<img src="/assets/img/1__1tw5U2sXD__zDf3N1aeR2Ng.png" alt="">

we need to add route first. In `config/route.rb` add
```
Rails.application.routes.draw do  
  resources :candidates do  
    member do  
      post :vote  
    end  
  end  
end
```
then we can check the routes with
```
$ rails routes
```
<img src="/assets/img/1__rdEwnVo__69GU4NNyftUL6A.png" alt="">

There is a new route called `vote_candidate` With this route, we can change url in `app/views/index.html.erb` from
```
<td><%= link_to "Vote", "#" %></td>
```
to
```
<td><%= link_to "Vote", vote_candidate_path(candidate), method: "post", data: { confirm: "are you sure?" } %></td>
```
### Add Method for Voting (16)

Then let’s click the vote button for testing and the following error pops up
<img src="/assets/img/1__2HcbGsS2Pf9NReFQaSlFUA.png" alt="">

which means we do not have method, vote, so we can create one
```
def vote  
  @candidate = Candidate.find_by(id: params[:id])  
  @candidate.increment(:votes)  
  @candidate.save  
  redirect_to candidates_path, notice: "Vote!"  
end
```
### Add model for Voting (17)

After we create the vote method in the candidate controller, to avoid frauds, I are going to create a model for vote logging with three information:

1.  the voting time
2.  vote to whom
3.  the voter’s ip address

The following code can create a model for vote with 3 columns, timestamp, candidate and ip_address
```
$ rails generate model vote_log candidate:references ip_address:string
```
and then migrate it
```
$ rails db:migrate
```
Then we need to define the connection between models, in `app/models/candidate.rb` modify the code into
```
class Candidate < ApplicationRecord  
  has_many :vote_logs, dependent: :destroy  
end
```
which means a candidate can has many vote_log and `dependent: :destroy` means this vote_logs can be delete after the candidate being deleted

Because in generating model part, we add column, candidate with references, the model of vote will have a belongs_to method
<img src="/assets/img/1__QZrj3tPTN8U4x6vMYEXXEQ.png" alt="">

Then, modify method, `vote` in `app/controllers/candidates_controller.rb` so that after voting, the three information we want will be add into vote_logs table, the method is as follow:
```
def vote  
  @candidate = Candidate.find_by(id: params[:id])  
  @candidate.vote_logs.create(ip_address: request.remote_ip) if @candidate  
  redirect_to candidates_path, notice: "vote accomplished!"  
end
```
After modifying this method, use `rails console` to check whether the voting record written in database
<img src="/assets/img/1__u__6xcLo1L1h__UHnFOSIWkg.png" alt="">

which verifies successfully inserting data into vote log. Then, modify the `app/views/candidates/index.html.erb` from
```
<td><%= candidate.votes %></td>
```
to
```
<td><%= candidate.vote_logs.count %></td>
```
#### The concept of notice

open `app/controllers/candidates_controller.rb`. There are notice in methods, CRUD. We can add this notice to `app/views/layouts/application.tml.erb` from
```
<body>  
  <%= yield %>  
</body>
```
to
```
<body>  
  <%= notice %>  
  <%= yield %>  
</body>
```
which is going to pop up notice after CRUD.

### Counter Cache (18)

The main page:
<img src="/assets/img/1__HOz__H2u9AH3hINfXOFyf4Q.png" alt="">

and the log after we open the main page:
<img src="/assets/img/1__MtuyUY0et73BpCsKcB__Z__Q.png" alt="">

,meaning with 2 candidates, there are 3 `SELECT` in database, causing efficiency problem. We are going to change it into 1 query. In rails, we solve it with Counter Cache.

It is to **cache** the number of vote in candidates model rather than in VoteLog model.

As rails [Active Record Migrations](https://guides.rubyonrails.org/active_record_migrations.html) noted:

Because we want to add a column to count votes in candidate model, we can use following migration
```
$ rails generate migration add_counter_to_candidate vote_logs_count:integer
```
which is going to add a vote_logs_count into candidate model with migration, AddCounterToCandidate

(If the migration name is of the form “AddColumnToTable” or “RemoveColumnFromTable” and is followed by a list of column names and types then a migration containing the appropriate [add_column](https://api.rubyonrails.org/v6.1.3/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_column) and [remove_column](https://api.rubyonrails.org/v6.1.3/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-remove_column)` statements will be created)
<img src="/assets/img/1__g10yu__KJvGZBEoiInOuIEA.png" alt="">

Then start migration
```
$ rails db:migrate
```
and add `counter_cache: true` in `app/models/vote_log.rb`
```
class VoteLog < ApplicationRecord  
  belongs_to :candidate, counter_cache: true  
end
```
Then change `app/views/candidates/index.html.erb` from
```
<td><%= candidate.vote_logs.count %></td>
```
to
```
<td><%= candidate.vote_logs.size %></td>
```
Then it will query only once
<img src="/assets/img/counter_cache.png" alt="">

### Neat Controller (19)

Let’s look at the `app/controllers/candidates_controller.rb`. The following code repeated a lot
```
@candidate = Candidate.find_by(id:params[:id])
```
We can use `before_action` to do it before any action. Above any method coding add
```
before_action :find_candidate, only: [:edit, :update, :destroy, :vote]
```
It means when it call the four method: edit, update, destroy, vote, do the method, find_candidate first.

Then we can change the methods from
```
def edit  
  @candidate = Candidate.find_by(id: params[:id])  
end

def update  
  @candidate = Candidate.find_by(id: params[:id])  
  if @candidate.update(candidate_params)  
    redirect_to candidates_path, notice: "successfully updating!"  
  else  
    render :edit  
  end  
end

def destroy  
  @candidate = Candidate.find_by(id: params[:id])  
  @candidate.destroy if @candidate
  redirect_to candidates_path, notice: "Successfully deleted!"  
end

def vote  
  @candidate = Candidate.find_by(id: params[:id])  
  @candidate.vote_logs.create(ip_address: request.remote_ip) if @candidate
  redirect_to candidates_path, notice: "vote accomplished!"  
end
```
to
```
def edit  
end

def update  
  if @candidate.update(candidate_params)  
    redirect_to candidates_path, notice: "successfully updating!"  
  else  
    render :edit  
  end  
end

def destroy  
  @candidate.destroy if @candidate
  redirect_to candidates_path, notice: "Successfully deleted!"  
end

def vote  
  @candidate.vote_logs.create(ip_address: request.remote_ip) if @candidate
  redirect_to candidates_path, notice: "vote accomplished!"  
end
```
### Use Bootstrap (20)

we can use gem file `bootstrap-sass` , the [installation](https://github.com/twbs/bootstrap-sass) (you must follow the official method to install it)

#### Steps for bootstrap-sass

In Gemfile, add
```
gem 'bootstrap-sass', '~> 3.4.1'  
gem 'sassc-rails', '>= 2.1.0'
```
and then
```
$ bundle install
```
Then create `app/assets/stypesheets/application.scss`

In application.scss, add
```
// "bootstrap-sprockets" must be imported before "bootstrap" and "bootstrap/variables"  
@import "bootstrap-sprockets";  
@import "bootstrap";
```
if application.css exists, remove it

Then, in `app/views/layouts/application.html.erb`, warp `<%= yield %>` with `<div>`
```
<body>  
  <%= notice %>  
  <div class="container">  
  <%= yield %>  
  </div>  
</body>
```
Then the main page has better looking
<img src="/assets/img/1__X6tfepgBRMhJUc2NEFSdjg.png" alt="">

#### Table

In `app/views/views/index.html.erb`, add class, table
```
<table class="table">
```
The main page:
<img src="/assets/img/1__1l5mqvtiUs6f6__3a8uZ3Gg.png" alt="">

#### Button

we want to make the vote as button. In `app/views/candidates/index.html.erb`
```
<td><%= link_to "Vote", vote_candidate_path(candidate), method: "post", data: { confirm: "are you sure?" }, class:"btn btn-danger btn-xs" %></td>
```
#### Simple form

The create and edit page looks as follow
<img src="/assets/img/1__aqvojQdDF2B__27DjxTBWow.png" alt="">

we can install simple_form with integration with bootstrap

Add the following into gemfile
```
gem 'simple_form'
```
Run
```
$ bundle install
```
Then generate simple_form
```
$ rails generate simple_form:install --bootstrap
```
Then edit `app/views/candidates/_form.html.erb`
```
<%= simple_form_for(candidate) do |f| %>  
  <%= f.input :name, label: "name" %>  
  <%= f.input :age, label: "age" %>  
  <%= f.input :party, label: "party" %>  
  <%= f.input :politics, label: "presentation" %>  
  <%= f.submit %>  
<% end %>
```
The page will look like
<img src="/assets/img/1__OIBCMTz2FQ85Ik71FzJEPQ.png" alt="">

### Reference:

[**為你自己學 Ruby on Rails 高見龍**](https://railsbook.tw/)

[**網站效能 - Rails 實戰聖經**](https://ihower.tw/rails/performance.html)

[**twbs/bootstrap-sass**](https://github.com/twbs/bootstrap-sass)
