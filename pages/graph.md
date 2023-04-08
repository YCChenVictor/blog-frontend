---
layout: page
title: Explore
permalink: /graph
---

<div id='node-graph'></div>

<div class='p-16'>
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
      <h2 id="{{ category }}">{{ category }}</h2>
      <ul>
        {% for post in site.posts %}
          {% if post.publish %}
            {% if post.categories contains category %}
              <h3>
                <a href="{{site.baseurl}}{{ post.url }}" class='textLink'>
                  {{ post.title }}
                  <small>{{ post.date | date_to_string }}</small>
                </a>
              </h3>
            {% endif %}
          {% endif %}
        {% endfor %}
      </ul>
    {% endfor %}
  </div>
</div>
