---
title: >-
  (Ruby_1) Install, Version Control, Variable, Constant, Flow Controller, Loop
  and Iteration
description: Use Ruby Version Manager to manage Ruby
date: '2021-02-04T08:50:32.446Z'
categories: []
keywords: []
slug: /@t5204713910/ruby-installation-21b24ebfb0ea
---

### RVM

#### Install RVM (Ruby Version Manager)

\\curl -sSL https://get.rvm.io | bash -s stable

#### Open RVM

You should know your own path. Take Mac as example, the path should be ‘/Users/user\_name/.rvm/scripts/rvm’

source 'your own path'

### Version Control

#### All Versions of Ruby that can be installed

rvm list known

#### Install Ruby 2.6

rvm install 2.6

#### Check Installed Versions

rvm list

#### Check Current Version

ruby -v

#### Use Other Ruby Version

rvm use 3.0.0

#### Change Default Ruby Version

rvm --default use 2.4.1

### Variable

#### Types

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ywZBLRlHrf____K66pKUAsiA.png)

#### Scope

Scope means the range that the variable can be use. If we define a variable, **name,** in a function then this variable can only be called in the function, not anywhere else; for example,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__MXgPL__Bv9Bnc4Uvdib2sfA.png)

### Constant

The only rule of constant is the first letter must be uppercase; for example,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__1bSiA4EZngxjQ1Aaa__EexA.png)

Actually, all the class and module name must be constant

### Flow Controller

#### True or False

Only nil and false are considered as false

#### if…elsif…else…

**inversion:** we can put if statement to the back as inversion. That is, from

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ozwwOZDNfqIiun8OHm__jbA.png)

to

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____YrEzmpfvZQwtxKoNb1nBA.png)

#### Unless = if not

#### Ternary

It is constructed from ? and : For example, from

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__YOKCxvUI__CRILIoVI8PGvg.png)

to

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__qQyOxf0g4uJw__LuwemEOfA.png)

#### Case…When

Can make the if…else… to be more concise; for example, from

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____juWAAE2TWNktquJMC7whA.png)

to

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__KrrerIAP2FlTa428FEJeMg.png)

### Loop and Iteration

#### while

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__vmyHyYWlhFwAm7B80aOaTw.png)

The output

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__N3smaWfVEBY__l3bcxEUisw.png)

#### for..in

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__lEAzOu5d2h__5spbfOdG1DA.png)

The output

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__iUP5j__juAx7id9rPi8u8Xw.png)

#### times

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Kvng6LeQ11jSJsC__XozqZA.png)

The output

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__diLIswcl3Hy0mtG____w4OVg.png)

#### upto

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__SB____f42imMaSTu1AdUKmcw.png)

The output

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__as__mN9vWXCbkOumfPR27uA.png)

#### downto

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__YdGvN__U__ZN6__aTsmOrG7Yw.png)

The output

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__7__n__vCqNJ__Hk9UZ8u2KmOQ.png)

#### interation

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__a5kax8tR__ucMhzDKgmKqNg.png)

The output

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__jb__NLQkPQPZizMz4ZU__33A.png)