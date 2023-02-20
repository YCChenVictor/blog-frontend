---
layout: page
title: Articles
permalink: articles
---

<div id="articles">
  {% for post in site.posts %}
    <div id="{{post.title}}">
      <h3><a href="{{site.baseurl}}{{ post.url }}">{{post.title}}</a></h3>
      <div class="text-sm text-gray-400">{{post.date | date: "%B %-d, %Y"}}</div>
    </div>
  {% endfor %}
</div>
