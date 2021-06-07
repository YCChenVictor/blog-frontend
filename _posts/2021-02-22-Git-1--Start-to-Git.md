---
title: (Git_1) Start to Git
description: Introduction
date: '2021-02-22T08:21:40.819Z'
categories: []
keywords: []
slug: /@t5204713910/git-1-installation-presetting-start-to-git-4a5935312db8
---

### Introduction

Git is the most popular version control system.

### Why

We need version control to track changes and identify why key decision were made along the way.

### (How) Before Git

#### Install

On mac, use homebrew to install git

$ `brew install git`

#### Check the version of git

$ which git

or

$ git --version

#### Setting

**check current setting**

$ git config --list

**add global setting**

To change the setting that fit into ‘all’ project,

$ git config --global user.name "the name you want"

or

$ git config --global user.email "xxx@yyy.com"

**add specific setting**

To change the setting only being used in specific project

$ git config --local user.name "the name you want"

or

$ git config --local user.email "xxx@yyy.com"

### (How) Start to Git

#### initializing git

To start version control with git in current directory

$ git init

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__syxu__rH684iHYmn1BZtxPg.png)

#### remove git

If you want to remove git on your directory

$ rm -rf .git

Then we can input following to check whether there is file related to git

$ ls -al

#### Check status

In git, there are three stages (working/stage/history) and the following process: working -> `git add` -> staged -> `git commit`\-> history

$ git status

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Pv1briXOtMvI7tU6__knn3g.png)

create a file for git status testing

$ echo "hello.git" > welcome.html

Then check status again

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__7JZv6zcN9KPNz6Y3XdQM6w.png)

There is a file, welcome.html, still untracked in git

#### Add file to temp

$ git add welcome.html

then check status

$ git status

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__5fKmVmoT6k30KoRtrfd69w.png)

#### Store the files

store it directly without vim

$ git commit -m "the message to note to this commit"

or open vim to type in message we want

$ git commit

#### View the historical commits

$ git log

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__xM9A96o__hrRKduVcs1vPCA.png)

If we want a neat overview:

$ git log --oneline --graph

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__HP4y4QxFD2OVofPPrZgcAA.png)

**Find key word in commits’ message**

$ git log --oneline --grep='wtf'

**Find key word in commits’ title**

$ git log -S 'Ruby'

**Find commits’ in a time range**

$ git log --online --since="9am" --until="12am"

**Find commits for specific file**

for example, if we want to read the commit message of specific file, wtf.html

$ git log wtf.html

or if we want to know the historical changes of a specific file

$ git log -p wtf.html

#### Use GUI — SourceTree

With Graph, we can have more clear overview to the git branches

[**Sourcetree | Free Git GUI for Mac and Windows**  
_As our new Bitbucket space station administrator, you need to be organized. When you make files for your space station…_www.sourcetreeapp.com](https://www.sourcetreeapp.com/ "https://www.sourcetreeapp.com/")[](https://www.sourcetreeapp.com/)

### reference:

[**Git**  
_Git is a free and open source distributed version control system designed to handle everything from small to very large…_git-scm.com](https://git-scm.com/ "https://git-scm.com/")[](https://git-scm.com/)

[**什麼是 Git？為什麼要學習它？ - 為你自己學 Git | 高見龍**  
_← 上一章：寫在最前面 - 為你自己學 Git！ 下一章：與其它版本控制系統的差異 → 如果你問大部份正在使用 Git 這個工具的人「什麼是 Git」，他們大多可能會回答你「Git 是一種版本控制系統」，專業一點的可能會回答你說「Git…_gitbook.tw](https://gitbook.tw/chapters/introduction/what-is-git.html "https://gitbook.tw/chapters/introduction/what-is-git.html")[](https://gitbook.tw/chapters/introduction/what-is-git.html)

[**What is Git: become a pro at Git with this guide | Atlassian Git Tutorial**  
_By far, the most widely used modern version control system in the world today is Git. Git is a mature, actively…_www.atlassian.com](https://www.atlassian.com/git/tutorials/what-is-git "https://www.atlassian.com/git/tutorials/what-is-git")[](https://www.atlassian.com/git/tutorials/what-is-git)