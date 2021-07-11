---
layout: post
title: (Javascript 6) Ajax
date: '2021-06-29'
state:
categories: javascript
note: 這之後要把不用 reload 的效果做出來，雖然我不知道怎麼做
---
## Summary
1. AJAX = Asynchronous JavaScript and XML
2. It achieves the result of updating parts of the web page -> reduce the interactions bet. client and server -> the application can have more special effect.
3. The process: Request data from external server -> Parse the data -> Load data **without** a refresh -> Data can be formats like (XML, JSON, HTML)

## Why
skip

## How
From wiki: with Ajax, web applications can send and retrieve data from a server asynchronously (in the background) without interfering with the display and behaviour of the existing page. I am going to show an example with `https://jsonplaceholder.typicode.com/`,
### Basic Setting
#### index.html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <script src="main.js"></script>
  </head>
  <body>
  </body>
</html>
```
#### main.js
```
document.addEventListener('DOMContentLoaded', function() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(request => request.json())
    .then(posts => {
      console.log(posts)
  })
})
```
then in console, 
<img src="/assets/img/fetch_data_ajax.png" alt="fetch_data_ajax">

Then, I am going to show the effect of AJAX, which is going to show a loading view and **after it fetch the requested data successfully**, the data will replace the loading without page refreshed.  
#### index.html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <script src="main.js"></script>
  </head>
  <body>
    <div class="post-title">
      <h2> Loading... </h2>
    </div>
  </body>
</html>
```
#### main.js
```
document.addEventListener('DOMContentLoaded', function() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(request => request.json())
    .then(posts => {
      const firstPost = posts[0];
      const postTitleA = document.querySelector('.post-title');
      postTitleA.textContent = firstPost.title
      document.querySelector('.post-title').textContent =firstPost.title
  })
})
```
### Axios
skip
反正就是一個讓 AJAX 可以寫的更簡潔的東西

## Reference
[**Ajax-Wiki**](https://en.wikipedia.org/wiki/Ajax_(programming))

https://codelikethis.com/lessons/client-side-coding/ajax

https://forum.freecodecamp.org/t/here-are-the-most-popular-ways-to-make-an-http-request-in-javascript/190501

[**axios-github**](https://github.com/axios/axios)
