---
layout: post
title: prototype
description: ''
date: '2022-03-22'
categories: design-pattern presentation
note: 文章要強調這個 pattern 可以減少很多 IO，因為這是要 present 的，我看還是用 ruby 好了
mathjax:
mermaid: true
publish: true
---

## Introduction

For example, a worker created a document for weeks with following steps:

1. research on the internet for key informations (map to third-party method)
2. request private data from the company's database (map to private method)
3. organized all knowledge above and build storyline (map to public method)
4. compose presentation based on the storyline (map to transform or calculation method)
5. some tedious tasks before and after this work; for example, clean up the desk ...etc (map to some unrelated environment settings method)

After weeks of preparations, the worker performs really well and the boss asked him to perform the presentation to higher supervisors. The only difference will be in the step 4, which the worker need to change the style of the PPT and the core namings such as the main host and the title of meetings.

Given the information above, what will the worker do? Just copy the whole file and change namings, which is the core concept of prototype design pattern.

Prototype design pattern serves as the same concepts of this process; for **creating** new object by **clone** other object and do required modifications **at run time**.

## Why?

With prototype design pattern, no need to inherit a new class for objects with slightly different features. Just create one prototype and clone it and modify it at the run time, which saves lots of time.

## How?

### Class of Worker's Documents (trivial)

If we build the class intuitively, we may just create a class as follow:

```ruby
class DocumentWorker
  attr_accessor :title, :host, :document
  
  def initialize
    @title = nil
    @host = nil
    @confidential_info = nil
    @document = nil
  end
  
  def perform(title, host)
    setup_working_environment
    search_on_internet
    request_private_data
    build_story_line
    @document = compose_presentations(title, host)
  end
  
  def setup_working_environment
    puts 'seting_up_working_environment'
    sleep 1
  end
  
  def search_on_internet
    puts 'searching_on_internet'
    sleep 1
  end
  
  def build_story_line
    puts 'building_story_line'
    sleep 1
  end
  
  def compose_presentations(title, host)
    puts 'composing_presentations'
    sleep 1
    {
      'title': @title,
      'host': @host,
      'some_private_shit': @confidential_info
      'document': "document_#{title}_for_#{host}"
    }
  end

  def document
    @document
  end
  
  private
  def request_private_data
    puts 'request_private_data'
    @confidential_info = 'confidential_info'
    sleep 1
  end
end

presentation_for_boss = DocumentWorker.new.perform('monthly', 'boss')
puts '==========='
puts presentation_for_boss.document
```

## What?

```ruby

```

and create instance from these four classes

```ruby

```

I think I should count the processing time of new vs clone

## Reference

[Prototype Design Pattern Tutorial](https://www.youtube.com/watch?v=AFbZhRL0Uz8)

[[Design Pattern] Prototype 原型模式](https://ithelp.ithome.com.tw/articles/10221129)

[Prototype](https://refactoring.guru/design-patterns/prototype)
