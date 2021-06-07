---
title: (Rails_6) CRUD details without scaffold
description: >-
  The steps: Add View for Data Adding Page (7) -> Add Controller for Data Adding
  Page (8) -> Add Controller for Data Creating (9)
date: '2021-02-26T06:06:30.016Z'
categories: []
keywords: []
slug: /@t5204713910/rails-6-crud-details-without-scaffold-7937953fe550
---

### General Concept:

CRUD means Create, Read, Update, Delete. For rails, we can use following code to build all related stuff:

```
rails generate scaffold User name:string email:string tel:string
```

Then it will generate a model named User with name, email, tel column name

In railsbook, the example is voting system. Let’s review the basic structure of Route-MVC structure

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__GiaX4WZaeQLinrmcAhhL6g.png)

### Add View for Data Adding Page (7)

If we click Add Candidates, empty website pops up. We need to edit new.html.erb in app/views/new.html.erb. Open it and input following

<h1>Add Candidates</h1>

<%= form\_for(@candidate) do |f| %> <%= f.label :name, "name" %>  
 <%= f.text\_field :name %> <br />

<%= f.label :age, "age" %>  
 <%= f.text\_field :age %> <br />

<%= f.label :party, "party" %>  
 <%= f.text\_field :party %> <br />

<%= f.label :politics, "Presentation" %>  
 <%= f.text\_area :politics %> <br />

<%= f.submit %>  
<% end %>

<br />  
 <%= link\_to 'back to candidates list', candidates\_path %>

Then the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__3OJ7p82sd0f6jrYiUIxfUQ.png)

Which means we need to add method in controller because it cannot find @candidate

### Add Controller for Data Adding Page (8)

In app/controllers/candidates\_controller.rb, add the method, new

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__KxuzNa4CPj4mPCje9gmqUg.png)

then the website looks like

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__9gkmGuQfCd3qCSsKbS6Uaw.png)

### Add Controller for Data Creating (9)

Then we can try to input some data from creating, the following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__NCl45uHRfgwS35LlDAu9__Q.png)

which means there is no method called create in controller. Now, let’s create one

In app/controllers/candidates\_controller.rb add the following method

def create  
      
    [@candidate](http://twitter.com/candidate "Twitter profile for @candidate") = Candidate.new(params\[:candidate\])  
      
    if [@candidate](http://twitter.com/candidate "Twitter profile for @candidate").save # which means success  
      redirect\_to candidates\_path, notice: "add candidate successfully!"  
    else # return to the new page after fail   
      render :new  
    end

end

Notice, if fail, the webpage will `render :new`but not `redirect_to :new` . Why? If we use redirect\_to, after failing, the website will return to new method with all the input data washed. But the render means showing the new page with data unchanged.

Then trying the create button. The following error occurs

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__zP1u9zAg8y79pVcggLAYcA.png)

Rails trying to tell us that we should not input the whole params\[:candidate\] into the website, causing security risk. As a result, adding a method to filter data and then input into website:

In app/controllers/candidates\_controller.rb

private  
def candidate\_params  
  params.require(:candidate).permit(:name, :age, :party, :politics)  
end

Notice, the `private` will makes all method below into private

Then change the following code in method, `create` from

@candidate = Candidate.new(params\[:candidate\])

to

@candidate = Candidate.new(candidate\_params)

### Reference:

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)