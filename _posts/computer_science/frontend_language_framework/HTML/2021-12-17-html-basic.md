---
layout: post
title:
description: 'HTML, CSS, The Concept of Area Size in Layout'
date: '2021-12-17T02:44:33.376Z'
categories: html
note: html
publish: true
---

## Introduction

HTML = hypertext markup language, a kind of text file with **markup** for data, layout and arrangements.

Structure of this article:

* markups in a html
* CSS concepts

## Why

With markup, search engine and blind people can read the content of website correctly, giving semantic meanings to website.

## How

### markups in a html

```HTML
<!DOCTYPE html>  
<html lang="en">  
  <head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Document</title>  
  </head>  
  <body>  
    <h1>threeJS Blender</h1>  
    <p>text<strong>bold text</strong><em>italic text</em>text</p>
    <ul>  
      <li>無序清單</li>  
      <li>無序清單</li>  
      <li>無序清單</li>  
      <li>無序清單</li>  
      <li>無序清單</li>  
    </ul>  
    <ol>  
      <li>有序清單</li>  
      <li>有序清單</li>  
      <li>有序清單</li>  
      <li>有序清單</li>  
      <li>有序清單</li>  
    </ol>  
    <nav>這是導覽列</nav>  
    <a href="[https://www.google.com.tw/](https://www.google.com.tw/)">這是超連結</a>  
    <figure>  
      <img src="./example.png" alt="要是圖片失效會出現的一段文字">  
      <figcaption>這是這個圖片的註解</figcaption>  
    </figure>  
    <table border="2"> <!-- border 代表邊框的寬度 -->  
      <!-- table 會先從橫列開始寫，在開始寫直欄 -->  
      <tr>  
        <td>data</td>  
        <td>data</td>  
        <td>data</td>  
      </tr>  
      <tr>  
        <td>data</td>  
        <td>data</td>  
        <td>data</td>  
      </tr>  
      <tr>  
        <td>data</td>  
        <td>data</td>  
        <td>data</td>  
      </tr>  
    </table>  
  </body>  
</html>
```

**_What is semantic HTML?_** With proper HTML tags to markup the content of a website, the content, texts, can have clear meanings; this is a process of semantization.

**_(What?) Basic Example:_**

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__DA557vbelt6kYmxMKa5SPw.png)

### CSS

#### Introduction

**_What is CSS?_** The full name is Cascading Style Sheets. It is a style sheet language to describe the presentation of a document written in a markup language.

**_What can CSS do?_** All visual control in website can be achieved with CSS.

**_Evolution:_** Directly write the style we want into HTML markups -> Use markup, `<style>`and there are three grammars: selector, property, value -> Write a CSS file independently

#### How CSS works & What’s the effect of CSS

**_How CSS works?_** For example, if we want the color of a `<p>` to be green, then

```bash
<p style="color:green;">  </p>
```

However, if we want multiple `<p>` to be green, then we have to specify style in every `<p>` ; as a result, we use markup,`<style>` to collect all the style settings such as

```bash
<style>  
  p {  
     color: green;  
    }  
</style>
```

With above code, it will select all `<p>` and change the color of content into green, meaning the grammar:

selector {  
          property: value;  
         }

**_What’s the effect of CSS? The appearance of the paragraph:_**

The full html code would be following

```bash
<!DOCTYPE html>  
<html lang="en">  
<head>  
 <meta charset="UTF-8">  
 <meta name="viewport" content="width=device-width, initial-scale=1.0">  
 <title>Document</title>  
</head>  
<style>  
 p {  
     color: green;  
    }  
</style>  
<body>  
 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi molestiae laborum delectus, quis temporibus necessitatibus? Ullam optio, adipisci fugit nostrum eligendi. Ullam numquam officia, optio ut illum ex aliquam assumenda?</p>  
</body>  
</html>
```

And the appearance:

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__SB4JACbhrb4pomSht3pCwg.png)

### The Concept of Area Size in Layout

Notice, if you are going to test the code below, make sure the layout in your browser is in 100% mode.

#### The concept of visible size

For example, for the following setting up

```bash
<style>  
   
    div{  
     background-color: #aaa;  
     width: 300px;

    }

</style>  
```

<div>情節網路制度首頁辛苦歡迎您還沒，豪華投訴才會兩個台北新聞高級足球實施業績成就為你老婆好像，轉帖先進。</div>

The layout would be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__mS__5GQ__fI480KJRwl0EhYA.png)

As you can see, the width is 300px.

#### The concept of border

Adding `border: 10px solid #666;`into the code above

```bash
<style>  
   
    div{  
     background-color: #aaa;  
     width: 300px;  
     border: 10px solid #666;

    }

</style>  
```

<div>情節網路制度首頁辛苦歡迎您還沒，豪華投訴才會兩個台北新聞高級足球實施業績成就為你老婆好像，轉帖先進。</div>

Then the layout would be following

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__1eINq6HD5NJv__tCJybanRQ.png)

As you can see, the width of the layout now is 320px (width + border).

#### The concept of padding

Adding `padding: 10px;`into the code above as follow

```bash
<style>  
   
    div{  
     background-color: #aaa;  
     width: 300px;  
     border: 10px solid #666;  
     padding: 10px;

}

</style>  
```

<div>情節網路制度首頁辛苦歡迎您還沒，豪華投訴才會兩個台北新聞高級足球實施業績成就為你老婆好像，轉帖先進。</div>

Then the layout would be following

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__J2Trn__68oR9bFusQqa__vvg.png)

As you can see, the width of the layout now is 340px (width + border + padding).

#### Key Take Away

As we can see, the total width of an object is width + border + padding in the CSS setting, meaning if we want to insert three 200px width box with 10px padding and 10px border into a 600px width box, we need to specify the CSS width of the inner box into160px, not 200px.

### Reference

[**金魚都能懂的網頁設計入門 - 金魚都能懂了你還怕學不會嗎 :: 2019 iT 邦幫忙鐵人賽**  
_金魚都能懂了，你還怕你學不會嗎？ 太多人在學習網頁的路上遭遇到挫折與失敗，這次Amos想利用自身的經驗來分享網頁設計入門的一些眉角，挑戰自己連續發文外，也..._ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/users/20112550/ironman/2072 "https://ithelp.ithome.com.tw/users/20112550/ironman/2072")[](https://ithelp.ithome.com.tw/users/20112550/ironman/2072)

[**CSS - Wikipedia**  
_Edit description_en.wikipedia.org](https://en.wikipedia.org/wiki/CSS "https://en.wikipedia.org/wiki/CSS")[](https://en.wikipedia.org/wiki/CSS)