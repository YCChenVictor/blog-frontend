---
layout: post
title: (Javascript 6) Ajax
date: '2021-06-29'
state:
categories: javascript
---
## Summary
1. AJAX = Asynchronous JavaScript and XML
2. It achieves the result of updating parts of the web page -> reduce the interactions bet. client and server -> the application can have more special effect.

## Why
skip

## How
From wiki: with Ajax, web applications can send and retrieve data from a server asynchronously (in the background) without interfering with the display and behaviour of the existing page. I am going to show an example,
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
In console, 


## What

## Reference
[**Ajax-Wiki**](https://en.wikipedia.org/wiki/Ajax_(programming))
