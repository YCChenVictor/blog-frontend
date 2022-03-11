---
layout: page
title: Category
permalink: category
---

<div class="home">

  {% assign rawcategories = "" %}
  {% for post in site.posts %}
    {% assign tcategories = post.categories | join:'|' | append:'|' %}
    {% assign rawcategories = rawcategories | append:tcategories %}
  {% endfor %}
  {% assign rawcategories = rawcategories | split:'|' | sort %}
  {% assign categories = "" %}
  {% for categorie in rawcategories %}
  	{% if categorie != "" %}
  	  {% if categories == "" %}
  		{% assign categories = categorie | split:'|' %}
  	  {% endif %}
  	  {% unless categories contains categorie %}
  		{% assign categories = categories | join:'|' | append:'|' | append:categorie | split:'|' %}
  	  {% endunless %}
  	{% endif %}
  {% endfor %}

  <ul>
	{% for categorie in categories %}
	  <a href="#{{ categorie | slugify }}"> <i class="fa-fire"></i> {{ categorie }}  </a>
    {% endfor %}
  </ul>
  
  {% for categorie in categories %}
	<h2 id="{{ categorie | slugify }}">{{ categorie }}</h2>
	<ul>
	  {% for post in site.posts %}
		{% if post.categories contains categorie %}
		<li>
		  <h3>
		    <a href="{{site.baseurl}}{{ post.url }}">
		      {{ post.title }}
		      <small>{{ post.date | date_to_string }}</small>
		    </a>
		  </h3>
		</li>
		{% endif %}
	  {% endfor %}
	</ul>
  {% endfor %}
</div>