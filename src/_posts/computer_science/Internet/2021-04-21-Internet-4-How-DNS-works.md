---
title: (Internet 4) How DNS works?
description:
date: '2021-04-21T09:40:50.036Z'
categories: internet
note:
---

## Introduction

The full name of DNS is Domain Name System. It can find the IP address with the URL; for example, after we input the `www.example.com,` it will try to find the IP address like `74.125.20.113;` that is, DNS can map URL to a IP address to locate the server on the internet.

## Why?

The numbers has no means for human being, so usually we may want a kind of phone book to check the numbers from website name (Domain Name). With Domain Name registered in the DNS, it is easier to memorize as human-being.

## How?

Suppose the user now input the URL `www.example.com.` The URL represents `third-level-domain.second-level-domain.first-level-domain.`

DNS searching procedure: `first-level-domain` -> `second-level-domain` -> `third-level-domain.`

### The searching procedure

There are three steps to search the ip address via url with DNS: local cache -> ISP cache -> name server

#### 1. local cache

After we visit a website, the browsers will save the response in the local machine temporally; for example,

<img src="/assets/img/local_cache.png" alt="" width=500>

As you can see, there is url: `www.google.com` maps to ip: `172.217.164.100` with IPV4, the fourth version of communication protocol for IP layer.

If it finds the mapping on local machine, it will not get ip address from the internet but directly get it on local machine.

#### 2. via ISP cache

ISP (internet service provider) provides internet service via Satellite, DSL, Broadband Cable, Fiber-Optic Cable, or Wi-Fi Broadband. While it letting user connect to internet, during user browsing internet, it saves the url mapping IP; as a result, once other user also browses internet via the same route of ISP, although the user did not browse it before, DNS can still get the mapping accordingly.

#### 3. via name server

As mentioned above, DNS is going to search the IP address via `first-level-domain` -> `second-level-domain` -> `third-level-domain,` which is `Root-Name-Servers` -> `TLD-Name-Servers` -> `Host-Name-Servers`

### Prevent DNS Spoofing

With the method above, we send request to DNS for mapping url to IP address, meaning we can construct fake server to send malware website to a normal urls. To prevent it, we use cryptographic authentication to DNS data, the DNSSEC (Domain Name System Security Extensions)

### Reference

[**DNS: Domain name system | AP CSP (article) | Khan Academy**  
_Learn how the domain name system (DNS) maps domain names to IP addresses using a scalable hierarchy of name servers…_www.khanacademy.org](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:web-protocols/a/domain-name-system-dns "https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:web-protocols/a/domain-name-system-dns")[](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:web-protocols/a/domain-name-system-dns)

[**互联网顶级域列表 - 维基百科，自由的百科全书**  
_edu顶级域仅限特定 高等教育 机构，包括但不限于中专院校、大学等。在美国于2001年确定限于二级及以上教育机构，并且必须通过的认证，因此该等域名往往属于美国大学院校。但仍有一些例如等不符合当前标准的机构在早些年注册过该域名。_zh.wikipedia.org](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E9%A1%B6%E7%BA%A7%E5%9F%9F%E5%88%97%E8%A1%A8 "https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E9%A1%B6%E7%BA%A7%E5%9F%9F%E5%88%97%E8%A1%A8")[](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E9%A1%B6%E7%BA%A7%E5%9F%9F%E5%88%97%E8%A1%A8)

[**What is an Internet Service Provider (ISP)? - Definition by Techslang**  
_An Internet service provider (ISP) is a company or an organization that lets your computer connect to the World Wide…_www.techslang.com](https://www.techslang.com/definition/what-is-internet-service-provider-isp/ "https://www.techslang.com/definition/what-is-internet-service-provider-isp/")[](https://www.techslang.com/definition/what-is-internet-service-provider-isp/)

[**Domain Name System Security Extensions - Wikipedia**  
_The Domain Name System Security Extensions ( DNSSEC) is a suite of Internet Engineering Task Force (IETF)…_en.wikipedia.org](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions "https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions")[](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions)