---
layout: page
permalink: about
---

<div class="mx-auto text-center prose prose-{{site.theme-color}}">
  <div>
    <img class="headPhoto" src="{{site.baseurl}}/assets/img/{{site.author-image}}"
      alt="author profile image">
    <h1>{{site.author}}</h1>
  </div>
  {% if site.author-bio %}
    <p class="text-gray-500 pb-4">{{site.author-bio}}</p>
  {% endif %}
  <div class='article'>
    <p>
      Hello and welcome to my personal blog! Have fun and have a good day! I was born and raised in Taiwan, and I've always had a passion for <a href='{{site.baseurl}}/self/2023/02/04/software.html'>software</a>, <a href='{{site.baseurl}}/self/2023/04/07/aesthetics.html'>aesthetics</a>, social science, and maybe some medical science. I graduated from National Taiwan University with a degree in economics, and I am now working as a software engineer.
    </p>
    <p>
      In my free time, you can usually find me developing websites, composing music, painting, and working out, or spending time with my family and pet. I also love to explore new topics and ideas.
    </p>
    <p>
      Through this blog, I hope to share my perspective on a variety of topics, mainly on software area currently. I believe anything that expand humanity, and I strive to live my life in a way that reflects those values.
    </p>
    <p>
      Thank you for taking the time to get to know me a little better, and I look forward to connecting with you through this blog!
    </p>
  </div>
</div>

{% include social-media.html %}
