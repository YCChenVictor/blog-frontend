---
layout: post
title: (Rails Elementary 4) View-Layout
date: '2021-03-02'
categories: rails
note: CSRF (Cross-site request forgery)
---

### CSRF (Cross-site request forgery)
CSRF: (要去查一下定義)

In `app/views/layouts/application.html.erb`,
```
<%= csrf_meta_tags %>
```

### How rails find layout for specific method?

In rails, if the controller name is xxxController, then it will try to find xxx.html.erb in `app/views/layouts` first and then go to `application.html.erb`.

#### Specific html in Controller

If I want it to render specific html, xxx, in Controller, I can do the following code
```
class CandidatesController < ApplicationController  
  layout "xxx"  
  ...  
end
```
#### Specific html in Action

If I want it to render specific html, xxx, in Action, I can do the following code
```
class CandidatesController < ApplicationController  
    
  def index  
    @candidates = Candidate.all  
    render layout: "xxx"  
  end

  ...

end
```
### What if I want multiple yield in the same file?

To have multiple yield in one html, you need to have tag for rails identifying which yield to fill in. For example, when I call main page, by default, rails will go to layout to find `application.html.erb`. Then it detects yield, so it go to the views/xxx/yyy.html.erb to find what to be filled into yield if we call a method in webpage xxx/yyy. To help rails to identify which yield to choose, in `yyy.html.erb`
```
...  
<title><%= yield :test %></title>  
...  
<%= yield %>
```
and in `application.html.erb`, there are two method: provide and content_for

#### provide
```
<% provide :test, "Hello" %>

...
```
It will fill Hello into yield :test, and fill the rest of code into yield

#### content_for
```
<% content_for :test do %>  
  Hello  
<% end %>

...
```
It will fill Hello to yield :test and fill the rest of code into yield

### Partial Render

In rails,
```
<% render "form" %>
```
means it will find `_form.html.erb` file in the same directory and put the content into the place of render. Partial render fits the reusage of a html.

For example, if the file,`_form.html.erb:`
```
<%= simple_form_for(candidate) do |f| %>  
  <%= f.input :name, label: "name" %>  
  <%= f.input :age, label: "age" %>  
  <%= f.input :party, label: "party" %>  
  <%= f.input :politics, label: "presentation" %>  
  <%= f.submit %>  
<% end %>
```
Then, in `edit.html.erb`
```
<h1>Edit Candidate</h1>  
<%= render "form", candidate: @candidate %>  
<br />  
<%= link_to 'back to candidates list', candidates_path %>
```
it will put the codes of `_form.html.erb` on the place of `render` in `edit.html.erb` and input the value of `@candidate` to `candidate` .

#### Why `candidate: @candidate` ?

Because `_form.html.erb` as reusable file, it should not take any responsible to find the variable @candidate rather being fed value to candidate with @candidate.

### View Helper

Take a look at following
```
<tr>  
  <td>  
   <% if gender == 1 %>  
     male  
   <% elsif gender == 0 %>  
     female  
   <% else %>  
     anything  
   <% end %>    
  </td>  
</tr>
```
There is if else logic in it. However, because view should just render template, the logic should not in view, so in rails, there is helper to solve this problem.

In helper, we can define a function
```
def user_gender (gender)

  if gender == 1  
    return "male"  
  elsif gender == 0  
    return "female"  
  else  
    return "anything"

  end

end
```
Then the logic in html can be written as
```
<tr>  
  <td>  
   <%= user_gender(gender) %>  
  </td>  
</tr>
```
### Reference:

[**為你自己學 Ruby on Rails 高見龍**](https://railsbook.tw/)