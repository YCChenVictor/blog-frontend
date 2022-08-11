---
layout: post
title: (Git) Getting Started
date: '2021-02-22T08:21:40.819Z'
categories: git
note:
publish:
---

### initializing git

To start version control with git in current directory
```
$ git init
```
<img src="/assets/img/git_init.jpg">

### remove git

If you want to remove git on your directory, just delete the whole .git files
```
$ rm -rf .git
```

Then we can input following command to check whether there is file related to git
```
$ ls -al
```

### Check status

In git, there are three stages (working/staged/history) and the following process: working -> `git add` -> staged -> `git commit` -> history
```
$ git status
```
<img src="/assets/img/1__Pv1briXOtMvI7tU6__knn3g.png">

create a file for git status testing
```
$ echo "hello.git" > welcome.html
```
Then check status again
<img src="/assets/img/1__7JZv6zcN9KPNz6Y3XdQM6w.png">

There is a file, `welcome.html`, still untracked in git

### Add file to temp
```
$ git add welcome.html
```
then check status
```
$ git status
```
<img src="/assets/img/1__5fKmVmoT6k30KoRtrfd69w.png">

### Store the files

store it directly without vim
```
$ git commit -m "the message to note to this commit"
```
or open vim to type in message we want
```
$ git commit
```
### View the historical commits
```
$ git log
```
<img src="/assets/img/1__xM9A96o__hrRKduVcs1vPCA.png">

If we want a neat overview:
```
$ git log --oneline --graph
```
<img src="/assets/img/1__HP4y4QxFD2OVofPPrZgcAA.png">

#### Find key word in the message of commits
```
$ git log --oneline --grep='the_message_you_want_to_find'
```
#### Find key word in the title of commits
```
$ git log -S 'the_title_you_want_to_find'
```
#### Find commits in a time range
```
$ git log --online --since="9am" --until="12am"
```
#### Find commits for specific file

for example, if we want to read the commit message of specific file, wtf.html
```
$ git log the_specific_file.html
```
or if we want to know the historical changes of a specific file
```
$ git log -p the_specific_file.html
```
### Use GUI — SourceTree
With Graph, we can have more clear overview to the git branches

[**Sourcetree Free Git GUI for Mac and Windows**](https://www.sourcetreeapp.com/)

## reference:

[**Git**](https://git-scm.com/)

[**什麼是 Git？為什麼要學習它？](https://gitbook.tw/chapters/introduction/what-is-git.html)

[**What is Git: become a pro at Git with this guide**](https://www.atlassian.com/git/tutorials/what-is-git)