---
layout: page
title: Category
permalink: category
---
<div id='category'></div>

{% assign rawcategories = "" %}
{% for post in site.posts %}
  {% assign tcategories = post.categories | join:'|' | append:'|' %}
  {% assign rawcategories = rawcategories | append:tcategories %}
{% endfor %}
{% assign rawcategories = rawcategories | split:'|' | sort %}
{% assign categories = "" %}
{% for category in rawcategories %}
  {% if category != "" %}
    {% if categories == "" %}
      {% assign categories = category | split:'|' %}
    {% endif %}
    {% unless categories contains category %}
      {% assign categories = categories | join:'|' | append:'|' | append:category | split:'|' %}
    {% endunless %}
  {% endif %}
{% endfor %}

<div id='tags' class='hidden'>
  {% for category in categories %}
    <div>
      {{ category }}
    </div>
  {% endfor %}
</div>
  
<div id='articles'>
  {% for category in categories %}
    <h2 id="{{ category | slugify }}">{{ category }}</h2>
    <ul>
      {% for post in site.posts %}
        {% if post.publish %}
          {% if post.categories contains category %}
          <li>
            <h3>
              <a href="{{site.baseurl}}{{ post.url }}">
                {{ post.title }}
                <small>{{ post.date | date_to_string }}</small>
              </a>
            </h3>
          </li>
          {% endif %}
        {% endif %}
      {% endfor %}
    </ul>
  {% endfor %}
</div>

<script type="text/javascript" src="{{site.baseurl}}/assets/javascripts/bundle.js" charset="utf-8"></script>
