---
layout: post
title:
description: ''
date: '2021-04-09T03:37:42.357Z'
categories: internet
note: 那個圖要改掉，自己畫。what 的部分要跟 how 的內容 match。intention 可以進 RFC 裡看。what section 之前的寫太菜了，現在可以在改好一點
publish: true
---

## Introduction

HTTP is on application layer; With this layer, people use understandable logics to operate and achieve their goals; for example, users can use mouse to click a link on webpage in browsers, and then the client side will send requests which follows HTTP and walk through the layers below application layer to server. Given the informations sent from client, server side will parse these informations to decide the next move.

The layers as follow:

<img src="/assets/img/1__RwTbhJGkPNdHriCUy6vDww.png" alt="" width=300>

## Why?

HTTP (HyperText Transfer Protocol) defines the official way for machines to communicate with each other. It normalizes the communications between client side (browsers in Mac, Pc, iPhone, ...etc) and server side on internet.

## How?

An HTTP request from client side contains:

* version type
  * example: HTTP/1.0
  * intention: let sender to tell receiver the format of this http message and the expected format of further http communication
* URL
  * TBC
* method
  * TBC
* request headers: key informations (refer to [wiki](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields))
* body (optional)

An HTTP response from server side contains:

* status code
  * TBC
* response headers: key informations (refer to [wiki](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Response_fields))
* body (optional)

## What?

### client

```bash
GET / HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

### server

```bash
HTTP/1.1 200 OK
Date: Mon, 23 May 2005 22:38:34 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 155
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
ETag: "3f80f-1b6-3e1cb03b"
Accept-Ranges: bytes
Connection: close

<html>
  <head>
    <title>An Example Page</title>
  </head>
  <body>
    <p>Hello World, this is a very simple HTML document.</p>
  </body>
</html>
```

For example, a user uses browser and want to see news on website. Then the following steps occur:

1. input URL (uniform resource locator)
2. browsers identify the specific server
3. browsers send request to the specific server
4. The specific server response data

### 1. Input URL

User knows the specific URL to locate the website and input it into web browser. The form of URL: `http://www.example.com/index.html`

This URL means please use `http` to "GET", the behavior to enter the URL, `index.html` file from `www.example.com`

### 2. Browsers Identify The Specific Server

The browsers will go to the internet try to get `www.example.com`. The way it use  to identify `www.example.com` is "through IP address" with DNS (gonna talk about DNS later). DNS will map `www.example.com` to a specific IP address for browsers locate the specific server.

### 3. Browsers Send Data to The Specific Server

After it locate the server, it will send a HTTP request to the server through internet and the message will go through bottom layers.

A typical message of HTTP:

```bash
GET / HTTP/1.1
Host: www.example.com
```

**The meaning of this message:** get `/` through `HTTP/1.1` from `www.example.com` and `HTTP/1.1` means the version, 1.1 of HTTP.

### 4. The Specific Server Response data

If the server successfully get the request from browsers, the browsers will return

```bash
HTTP/1.1 200 OK  
Content-Type: text/html
```

**The meaning of this message:** Successfully locate `HTTP/1.1` and return status `200` and the type of data to be sent is `text/html`. `200` is a kind of HTTP status, meaning success.

If fail, the browsers will return

```bash
HTTP/1.1 404 NOT FOUND
```

meaning it cannot found `www.example.com` and return HTTP status, `404`

All the status:

```bash
Informational responses (100–199)
Successful responses (200–299)
Redirection messages (300–399)
Client error responses (400–499)
Server error responses (500–599)
```

### Reference

[Hypertext Transfer Protocol - Wikipedia](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)

[HTTP: Hypertext Transfer Protocol (article) | Khan Academy](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:web-protocols/a/hypertext-transfer-protocol-http)

[An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)

[HTTP Requests | Codecademy](https://www.codecademy.com/articles/http-requests)

[什麼叫做 Protocol (通訊協定)](https://www.ithome.com.tw/node/6349)

[5 Advantages and Disadvantages of HTTP | Drawbacks & Benefits of HTTP](https://www.hitechwhizz.com/2020/08/5-advantages-and-disadvantages-drawbacks-benefits-of-http.html)

[一文搞懂 HTTP 和 HTTPS 是什麼？兩者有什麼差別｜ALPHA Camp Blog](https://tw.alphacamp.co/blog/http-https-difference)

[什麼是 URL 網址 IP ？網域 Domain 中文 意思是什麼？｜鵠崙設計](https://www.design-hu.com/web-news/domain.html)

[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

[What is HTTP?](https://www.cloudflare.com/en-gb/learning/ddos/glossary/hypertext-transfer-protocol-http/)

[List of HTTP header fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Response_fields)

[RFC 1945, Hypertext Transfer Protocol - HTTP/1.0](https://www.rfc-editor.org/rfc/rfc1945)
