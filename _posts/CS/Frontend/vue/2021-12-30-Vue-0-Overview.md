---
layout: post
title: Overview
description: ''
date: ''
categories: vue
note: start to learn Vue for company usage (use the quickest way to understand it and we can decompose this articule into multiple part in the future)
---

## Introduction

quick explanation

## Why?

focus on why we need it

## How?

### index.html

1. create a basic template
2. import vue with CDN
3. create Vue app and add mount
4. add v-model to dynamically change the text
5. add v-if for box showing

```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue 3 Basic</title>
    <style>
        .box {
            background-color: purple;
            height: 200px;
            width: 200px;
        }
    </style>
</head>
<body>
    <div id="app">
        {{ greeting }}
        <input v-model = "greeting" />
    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>
        let app = Vue.createApp({
            data: function() {
                return {
                    greeting: "Hello World"
                }
            }
        })
        app.mount('#app')
    </script>
</body>
</html>
```


## What?

give an example

## Reference
[Vue.js Course for Beginners [2021 Tutorial]](https://www.youtube.com/watch?v=FXpIoQ_rT_c&t=0s)
