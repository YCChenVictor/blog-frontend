---
layout: post
title:
description: ''
date: '2022-10-15'
categories: CSS
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

This article describes the concept of CSS, Cascading Style Sheets. It is a style sheet language to describe the presentation of a document written in a markup language. All visual control in website can be achieved with CSS.

## Why

The evolution: Directly write the style we want into HTML markups -> Use markup, `<style>` and there are three grammars: selector, property, value -> Write a CSS file independently

## How

For example, if we want the color of a `<p>` to be green, then

```CSS
<p style="color:green;">  </p>
```

However, if we want multiple `<p>` to be green, then we have to specify style in every `<p>`. We can use markup, `<style>` to collect all the style settings such as

```CSS
<style>  
  p {  
     color: green;  
    }  
</style>
```

The effect:

<img class='' src="{{site.baseurl}}/assets/img/concept_of_style.png" alt="">

### size

The total width of a component:

```CSS
...
<style>
  div {  
    background-color: #aaa;  
    width: 300px;
  }
</style>
...

<div>情節網路制度首頁辛苦歡迎您還沒，豪華投訴才會兩個台北新聞高級足球實施業績成就為你老婆好像，轉帖先進。</div>
```

The effect: (the width is 300px)

<img class='' src="{{site.baseurl}}/assets/img/1__mS__5GQ__fI480KJRwl0EhYA.png" alt="">

Concept of font size:

```CSS
<style>
  div {  
    font-size: 40px;
  }
</style>
```

### spacing

* Margins control the space between an element and its neighbors
* Padding controls the space within an element
* Borders are used to define the edges of an element

#### margin

```HTML
...
<style>
  div {
    background-color: #aaa;  
    width: 300px;  
    border: 10px solid #666;
  }
</style>
...

<p>情節網路制度首頁辛苦歡迎您還沒，豪華投訴才會兩個台北新聞高級足球實施業績成就為你老婆好像，轉帖先進。</p>
<p>情節網路制度首頁辛苦歡迎您還沒，豪華投訴才會兩個台北新聞高級足球實施業績成就為你老婆好像，轉帖先進。</p>
```

There will be margin between the paragraphs

#### border

Adding `border: 10px solid #666;` into the code above

```CSS
...
<style>
  div {
    background-color: #aaa;  
    width: 300px;  
    border: 10px solid #666;
  }
</style>
...

<div>情節網路制度首頁辛苦歡迎您還沒，豪華投訴才會兩個台北新聞高級足球實施業績成就為你老婆好像，轉帖先進。</div>
```

The effect: (the width of the layout is 320px (width + border))

<img class='' src="{{site.baseurl}}/assets/img/concept_of_border.png" alt="">

* concept of border radius

The rounded border, with react, with `rounded-sm`

```jsx
<button
  onClick={setModalOpen}
  className="bg-white absolute top-4 right-4 rounded-sm p-2"
>Create Task</button>
```

the layout:

<img class='' src="{{site.baseurl}}/assets/img/concept_of_border_radius.png" alt="">

#### padding

Adding `padding: 10px;`into the code above as follow

```CSS
...  
<style> 
  div {  
    background-color: #aaa;  
    width: 300px;  
    border: 10px solid #666;  
    padding: 10px;
  }
</style>  
...

<div>情節網路制度首頁辛苦歡迎您還沒，豪華投訴才會兩個台北新聞高級足球實施業績成就為你老婆好像，轉帖先進。</div>
```

The layout: (the width of the layout is 340px (width + border + padding))

<img class='' src="{{site.baseurl}}/assets/img/concept_of_padding.png" alt="">

### float

With float style, an object can float on other objects, looks like it cover other object in web browsers; for example,

```HTML
<style>  
 .img-float{  
    float:left  
  }
</style>  
...
<img src="[http://fakeimg.pl/350x200](http://fakeimg.pl/350x200)" alt="">

<p>Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Ullam quae magni, iste nam ratione doloribus corporis accusamus reiciendis neque dolore qui pariatur atque tenetur facere soluta adipisci, porro odit, aut.</p>
```

The layout:

<img class='' src="/assets/img/concept_of_float.png" alt="">

### Display

We can categorize the objects in html into inline and block. The easiest way to distinguish the difference is that one block will fill all the horizontal area while inline would not.

<img class='' src="{{site.baseurl}}/assets/img/concept_of_display.png" alt="">

* block markups: `div、p、ul、li`
* inline markups: `span、a、input、img、em`

We can use `display` style to specify the display

* `display:inline` can force objects to be displayed inline

```CSS
...   
  <h1>block with h1</h1>  
  <p>block with p</p>
...
```

<img class='' src="{{site.baseurl}}/assets/img/1__D2OzqBeBPksgxvggUjVqvQ.png" alt="">

* `display:block`: TBC
* `display:inline-block`: TBC
* `display:flex` can let the objects in this object to be displayed flexibly

For example,

```CSS
<div class="warp">
  <div class="item">
      lorem
  </div>
  <div class="item">
      lorem
  </div>
  <div class="item">
      lorem
  </div>
</div>
...
.warp {  
  width: 960px;  
  margin: auto;  
  background: #ccc;  
  display: flex;  
}  
.item {  
  width: 300px;  
  margin: 0 10px 10px;  
  background-color: #ffa;  
}
```

Then the layout:

<img class='' src="{{site.baseurl}}/assets/img/1__xlJ9o__43sRsfldS3fNAqLA.png" alt="">

After adding `display:flex`, the layout:

<img class='' src="{{site.baseurl}}/assets/img/1__2kaGIS65qPkadcuQtGLrtQ.png" alt="">

You may think that the width of each item equals to 320px, which is width + margin*2 so the 3 items perfectly fit into the wrap. However, if we add two more items into the wrap as follow:

```HTML
<div class="warp">  
  <div class="item">lorem</div>
  <div class="item">lorem</div>
  <div class="item">lorem</div>
  <div class="item">lorem</div>
  <div class="item">lorem</div>
</div>
```

The layout:

<img class='' src="/assets/img/1__C4uMfYkqo8KYLn2QOPhlpA.png" alt="">

meaning it does not matter how you setup the width of the item in the wrap once you have flex in the CSS.

* `display:none` can hidden the html

#### flex vs inline

TBC, should be extract to another article

### Position

Suppose we add a block with `<div>` with following CSS setting:

```CSS
.whatever{
  width: 200px;
  height: 100px;
  background-color: #aaa;
}
```

The layout:

<img class='' src="{{site.baseurl}}/assets/img/1__7lDcRB2qLIMJuW74CaINjg.png" alt="">

if we add `position: fix` to the CSS setting, then the layout would be

<img class='' src="{{site.baseurl}}/assets/img/position_fix.png" alt="">

With `position: fix`, the object will be rendered on upper layer.

Difference between fix and float: `fix` fix on the exact position in the screen even you scroll the website.

We can specify the position with `top, left, right, bottom`:

```CSS
.whatever {
  width: 200px;
  height: 100px;
  background-color: #aaa;
  position: fixed;
  top: 0;
  left: 0;
}
```

<img class='' src="{{site.baseurl}}/assets/img/specify_position.png" alt="">

If we want it to be in the center, the CSS would be

```CSS
.whatever{
  width: 200px;
  height: 100px;
  background-color: #aaa;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
```

<img class='' src="{{site.baseurl}}/assets/img/position_center.png" alt="">

### Color

```CSS
/* Named color */
div {
  background-color: red;
}

/* Hexadecimal value */
p {
  background-color: #00FF00;
}

/* RGB value */
h1 {
  background-color: rgb(255, 0, 255);
}

/* RGBA value */
span {
  background-color: rgba(0, 0, 255, 0.3);
}

/* HSL value */
a {
  background-color: hsl(120, 100%, 50%);
}

/* HSLA value */
li {
  background-color: hsla(240, 100%, 50%, 0.5);
}
```

### Responsive Web Design (RWD)

Allows web pages to adjust their layout and content based on the size of the screen they are being viewed on.

#### tailwind

We can change the layout based on the width of screen

```HTML
<div class="p-16 prose prose-{{site.theme-color}}">
  ...
  <div class="px-4 md:grid lg:px-72">
    # content
  </div>
</div>
```

* md:grid: This sets the display of the element to a grid for medium screens and above. This means that the content within the element will be laid out in a grid format for screens that are wider than the medium breakpoint.
* lg:px-72: This sets the horizontal padding of the element to 72 units of the default spacing scale for large screens and above. This means that for screens that are wider than the large breakpoint, the horizontal padding will be much larger than it is for smaller screens.

### Condition

* To apply styles to all <a> elements except <a><img></a> (i.e., anchor elements that contain only an image), we can use the :not() and :only-child pseudo-classes together.
  ```CSS
  a:not(:only-child):not(.no-style) {
    /* Your styles here */
  }
  ```

### Tailwind

In Tailwind, you can remove a CSS style from an `<a>` element that is defined in the main.css file and imported through a link tag in the head of your HTML document using the !important keyword to override the existing style. For example,

```CSS
.my-link {
  color: blue;
  text-decoration: none;
}
```

and override them with `!`

```CSS
<a class="my-link text-blue-500 underline !text-decoration-none !hover:text-blue-700">
  My link
</a>
```

### Other

* table
  ```CSS
  table {
  border-collapse: collapse;
  width: 100%;
  }
  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  ```
* code section
  ```CSS
  code {
    @apply bg-gray-300;
    @apply border-gray-500;
    @apply p-0.5;
    @apply text-sm;
    @apply font-mono;
    @apply whitespace-pre-wrap;
    @apply break-words;
    @apply max-w-4xl;
  }
  ```

## What

Please check blog

## Reference

[金魚都能懂的網頁設計入門 - 金魚都能懂了你還怕學不會嗎 :: 2019 iT 邦幫忙鐵人賽](https://ithelp.ithome.com.tw/users/20112550/ironman/2072)

[CSS - Wikipedia](https://en.wikipedia.org/wiki/CSS)
