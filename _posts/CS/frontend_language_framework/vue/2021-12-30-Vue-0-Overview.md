---
layout: post
title: (Vue 0) Overview
description: ''
date: '2021-12-30'
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
5. add v-if for box showing (if `isVisible: true`, then the div with `v-if = isVisible` will appear)

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

        <div v-if="isVisible" class="box"></div>
    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>
        let app = Vue.createApp({
            data: function() {
                return {
                    greeting: "Hello World",
                    isVisible: true
                }
            }
        })
        app.mount('#app')
    </script>
</body>
</html>
```

### v-show

Given above template, we can use `<div v-show='isVisible' class=box></div>` instead of `<div v-if="isVisible" class="box"></div>`, then in the inspection of your browser, it use style to determine whether to show it or not.

### v-if v-else-if v-else

For some logics in rendering, use following `<div>`

```
...
<div v-if="isVisible" class="box"></div>
<div v-else-if="isVisible2" class="box two"></div>
<div v-else class="box three"></div>
...
```

and of course, styles:

```
...
.box {
    background-color: purple;
    height: 200px;
    width: 200px;
}
.box.two {
    background-color: red;
}
.box.three {
    background-color: blue;
}
...
```

With the components above, refreshing the page makes all the boxes appear at first, meaning Vue is not ready at first. To avoid it, add `v-clock` to `<div id="app">`.

### v-clock

`v-clock` avoids components being rendered before Vue being loaded with following settings

```
<div id="app" v-clock>
```

and

```
<style>
    [v-cloak] {
        display: none;
    }
</style>
```

## What?

Then we have the full example as follow:

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
        .box.two {
            background-color: red;
        }
        .box.three {
            background-color: blue;
        }
        [v-cloak] {
            display: none;
        }
    </style>
</head>
<body>
    <div id="app" v-cloak>
        {{ greeting }}
        <input v-model = "greeting" />

        <div v-if="isVisible" class="box"></div>
        <div v-else-if="isVisible2" class="box two"></div>
        <div v-else class="box three"></div>
    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>
        let app = Vue.createApp({
            data: function() {
                return {
                    greeting: "Hello World",
                    isVisible: false
                }
            }
        })
        app.mount('#app')
    </script>
</body>
</html>
```

## Reference
[Vue.js Course for Beginners [2021 Tutorial]](https://www.youtube.com/watch?v=FXpIoQ_rT_c&t=0s)
