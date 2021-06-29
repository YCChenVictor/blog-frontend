---
layout: post
title: '(Rails_2) User Name Display, N+1 Query, Gem'
date: '2021-02-06T05:55:54.810Z'
categories: rails
note: none
---

After the procedure of [Rails_1](https://t5204713910.medium.com/rails-installation-building-4a6de1641b84), let’s now solve the user name displaying problem

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__g4zDElZxyre__9LnjAmv2__A.png)

open app/views/posts/index.html.erb and then change post.user into post.user.name as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__I63aobUinvKv8sBBIHEtaA.png)

Then the user name should be normally displayed as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__hcpSu1BirHNjovChJtz__5A.png)

### N+1 Query

#### Problem

However, it causes efficiency problem. That is ‘N+1 Query’. Back to ‘[http://localhost:3000/posts](http://localhost:3000/posts)’

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__1wALyxNshVIZyRUY5EIyQw.png)

The server will run ‘four’ queries because there are three posts according to the relational between posts and users as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__woQozSJQ56irBRIA9iUmBw.png)

#### Solution

Go to app/controllers/posts\_controller.rb and change

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__rfJTFmBUWfJ51L9Gr0QYbA.png)

into

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__7Qe5zkJXOumhxGamjgaZOg.png)

Then the log in the server will be like

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__V5jtNZUMpU__DIwwbersGnA.png)

### Gem

We can use Gem to install the packaged codes built by other; for example, to install ‘faker’ package

$ gem install faker

Then we can use irb to test this package; for example, to create a fake emailss

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__FPD7k3GbL0PeR__K8jGXRhg.png)

#### Use Gem in Rails

In Rails, there is a file called Gemfile, telling rails what package to install with the specific version

**Gemfile full example**

source '[https://rubygems.org'](https://rubygems.org%27)

git\_source(:github) do |repo\_name|  
  repo\_name = "#{repo\_name}/#{repo\_name}" unless repo\_name.include?("/")  
  "[https://github.com/#{repo\_name}.git](https://github.com/#%7Brepo_name%7D.git)"  
end

\# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'  
gem 'rails', '~> 5.1.1'  
\# Use sqlite3 as the database for Active Record  
gem 'sqlite3'  
\# Use Puma as the app server  
gem 'puma', '~> 3.7'  
\# Use SCSS for stylesheets  
gem 'sass-rails', '~> 5.0'  
\# Use Uglifier as compressor for JavaScript assets  
gem 'uglifier', '>= 1.3.0'  
\# See [https://github.com/rails/execjs#readme](https://github.com/rails/execjs#readme) for more supported runtimes  
\# gem 'therubyracer', platforms: :ruby

\# Use CoffeeScript for .coffee assets and views  
gem 'coffee-rails', '~> 4.2'  
\# Turbolinks makes navigating your web application faster. Read more: [https://github.com/turbolinks/turbolinks](https://github.com/turbolinks/turbolinks)  
gem 'turbolinks', '~> 5'  
\# Build JSON APIs with ease. Read more: [https://github.com/rails/jbuilder](https://github.com/rails/jbuilder)  
gem 'jbuilder', '~> 2.5'  
\# Use Redis adapter to run Action Cable in production  
\# gem 'redis', '~> 3.0'  
\# Use ActiveModel has\_secure\_password  
\# gem 'bcrypt', '~> 3.1.7'

\# Use Capistrano for deployment  
\# gem 'capistrano-rails', group: :development

group :development, :test do  
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console  
  gem 'byebug', platforms: \[:mri, :mingw, :x64\_mingw\]  
  # Adds support for Capybara system testing and selenium driver  
  gem 'capybara', '~> 2.13'  
  gem 'selenium-webdriver'  
end

group :development do  
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.  
  gem 'web-console', '>= 3.3.0'  
  gem 'listen', '>= 3.0.5', '< 3.2'  
  # Spring speeds up development by keeping your application running in the background. Read more: [https://github.com/rails/spring](https://github.com/rails/spring)  
  gem 'spring'  
  gem 'spring-watcher-listen', '~> 2.0.0'  
end

\# Windows does not include zoneinfo files, so bundle the tzinfo-data gem  
gem 'tzinfo-data', platforms: \[:mingw, :mswin, :x64\_mingw, :jruby\]

**install package in rails project**

For example, if we want to install package named ‘sqlite3’ for further usage, we add the following code

gem 'sqlite3'

to gemfile first and them in terminal input the following code

$ bundle install

### Reference

[**為你自己學 Ruby on Rails | 高見龍**  
_如其標題，學習不需要為公司、長官或同事，不需要為別人，只為你自己。 立即購買 以下所有內容是我在 五倍紅寶石 Ruby on Rails 培訓課程所用到的補充教材，實體書已在各書店通路上市。本書以 Ruby 2.4.1 以及 Rails…_railsbook.tw](https://railsbook.tw/ "https://railsbook.tw/")[](https://railsbook.tw/)