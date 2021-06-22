---
layout: post
title: (Rails_25) Action View
description:
date: '2021-06-09'
categories: rails
keywords: []
state: to be continued
note: 這個了解夠清楚才會知道 commentable 的 reply 怎麼做
---
### Introduction

Action View templates are written with embedded Ruby in tags **mingled** with HTML. Action View responsible for compiling the response from action controller, communicating with the database and performing CRUD actions. There are also action view helpers for creating neat templates for views.

### Why

With Action View, we can use more maintainable and readable method to produce HTML files. Action View gives us a more structured way to write HTML files for websites.

### Structures

There are three components: **templates, partials, layouts**. If we directly use `scaffold` command in rails to generate an article class.

```
rails generate scaffold article
```

Then the structure of view will be

![](./img/1__i__PlmVyHz7AafRauDSnL__g.png)

#### Templates

As you can see, there are templates for `index.html.erb`(Listing and Options for Reading or **Deleting**), `edit.html.erb`(**Updating**), `new.html.erb`(**Creating**), `show.html.erb`(**Reading**). There is no template for Deleting, but in the `index.html.erb` file, we can see the following code

```
<%= link\_to 'Destroy', article, method: :delete, data: { confirm: 'Are you sure?' } %>
```

and the html will be

```
<a data-confirm="Are you sure?" rel="nofollow" data-method="delete" href="/articles/1">Destroy</a>
```

The `data: { confirm:'xxx' }` will send data to browser and pops up while deleting.

There are also other file type: [Builder](https://guides.rubyonrails.org/action_view_overview.html#builder) (generating XML) and [Jbuilder](https://guides.rubyonrails.org/action_view_overview.html#jbuilder) (generating JSON), letting us to communicate with other device in other date types.

#### Partials

In the structure, there is `_form.html.erb` and the Punctuation Marks `_` means we can render it in other html file; for example, in `edit.html.erb` , add

```
<%= render "product", product: @product %>
```

Then, the html in the `_form.html.erb` will be inserted into the file, `edit.html.erb` and all the `product` in `_form.html.erb` will be `@product` .

#### Layouts

There is also a layout directory and the files are application and mailer. These files will be the whole setting for html files.

#### [Partial Layouts](https://guides.rubyonrails.org/action_view_overview.html#partial-layouts) (skip)

### Helper

In rails, with above template structure, we can use functions to output HTML. With these functions, we can have more secure, maintainable, neat coding structure to build HTML files. The common functions:

#### simple\_format

code:

```
<%= simple_format("foo\nbar") %>
```

result:

```
<% # "<p>foo\\n<br />bar</p>" %>
```

#### truncate

code:

```
<%= truncate("Once upon a time in a world far far away") %>
```

result:

```
<% # "Once upon a time in a world..." %>
```

#### strip\_tags

code:

<%= strip\_tags("Strip <i>these</i> tags!") %>

result:

```
"Strip these tags!"
```

#### strip\_links

code:

```
[strip\_links](https://apidock.com/rails/ActionView/Helpers/SanitizeHelper/strip_links)**('**<a href="http://www.rubyonrails.org">Ruby on Rails</a>**')**
```

result:

_"Ruby on Rails" (with url)_

#### distance\_of\_time\_in\_words

code:

```
distance_of_time_in_words(Time.now, Time.now + 60.minutes)
```

result:

```
=> "about 1 hour"
```

#### distance\_of\_time\_in\_words\_to\_now

code:

```
distance_of_time_in_words_to_now(Time.now - 1.second)
```

result:

```
=> "less than a minute"
```

#### time\_tag

code:

```
time_tag(Time.now)
```

result:

```
=> "<time datetime=\"2014-11-03T23:55:11+08:00\">November 03, 2014 23:55</time>"
```

#### number\_with\_delimiter

code:

```
number_with_delimiter(1234567)
```

result:

```
=> "1,234,567"
```

#### number\_with\_precision

code

```
number_with_precision(123.4567, precision: 2)
```

result

```
=> "123.46"
```

#### link\_to

code:

```
<%= link\_to 'Destroy', article %>
```

result:

<a href="/articles/1">Destroy</a>

#### forms

In html, `<form>` is for user input; for example,

<form>  
  <label for="fname">First name:</label><br>  
  <input type="text" id="fname" name="fname"><br>  
  <label for="lname">Last name:</label><br>  
  <input type="text" id="lname" name="lname">  
</form>
.

and the appearance:

![](./img/1__Ikm0E1AT__q86UnFkFVHQaw.png)

##### to be continued...
In rails, we can use `form_for` or `form_tag` to do so. The key difference between these two functions is `form_tag` does not need model; as a result, if you only want user to input data but not to store it, `form_tag` is your good friend.

**form\_for**

for example, in a blog project, for user to add an article, the code would be as follow

```
<%=
```

and the result as follow

```
<form
```

as you can see the default method is `post` and the id and name are create with model name and instances name; for example, `id=”article_title”` and `name="article[title]"` and a button to submit input data with `”Create"` text on it.

**form\_tag**

For example, if we just want to do some search, we may only want user to input text they want to search and submit to do the action; as a result, the coding would be

```
<%=
```

and result would be

```
<form
```
  

**form\_with**

<%= link\_to 'Destroy', article %>

<a href="/articles/1">Destroy</a>

#### form\_for

#### form\_with

For example, the basic setting:

<%= form\_with url: "/search" do |form| %>  
<% end %>

then the html

<form action="/search" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity\_token" value="1ZCLR8L5yjrMBU5rf0tlemZr6amLW4p0vi7xuqv5sdGaGkhtHSGaY5IUrEoZRokm64HnCXvoJUI47JSPQdLTvg">  
</form>

The meaning of this html: create a form section for url: `"/search"` , meaning after we input 

  

  

**search form**

For example, if we want to create following webpage,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__7sztKeUKGjawNyZtJp71mA.png)

the coding will be as follow:

```
<%= form_with url: "/search", method: :get do |form| %>  <%= form.label :query, "Search for:" %>  <%= form.text_field :query %>  <%= form.submit "Search" %><% end %>
```

As you can see, the `form_with` method require us to input `url` and `:get` method and the url:

<form action="/search" accept-charset="UTF-8" method="get">  
  <label for="query">Search for:</label>  
  <input type="text" name="query" id="query">  
  <input type="submit" name="commit" value="Search" data-disable-with="Search">  
</form>

  

  

  

#### Self-defined Helper (skip)

  

  

  

  

  

  

  

### Reference

[**Action View Overview - Ruby on Rails Guides**](https://guides.rubyonrails.org/action_view_overview.html "https://guides.rubyonrails.org/action_view_overview.html")[](https://guides.rubyonrails.org/action_view_overview.html)

[**Action View Helpers - Ruby on Rails Guides**](https://guides.rubyonrails.org/action_view_helpers.html "https://guides.rubyonrails.org/action_view_helpers.html")[](https://guides.rubyonrails.org/action_view_helpers.html)

[**Action View - Helpers 方法**](https://ihower.tw/rails/actionview-helpers.html "https://ihower.tw/rails/actionview-helpers.html")[](https://ihower.tw/rails/actionview-helpers.html)

[**HTML Forms**](https://www.w3schools.com/html/html_forms.asp "https://www.w3schools.com/html/html_forms.asp")[](https://www.w3schools.com/html/html_forms.asp)