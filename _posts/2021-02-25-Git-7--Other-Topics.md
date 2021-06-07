---
title: (Git_7) Other Topics
description: ''
date: '2021-02-25T07:06:05.067Z'
categories: []
keywords: []
slug: /@t5204713910/git-7-other-topics-b763f5a9c3d7
---

### Solve the private information problem

After changing the password or information

#### First Method: delete whole .git file

Although this method discard the whole history, it still works

#### Second Method: filter-branch

For example, if the private information exists in aaa.txt. We can

$ git filter-branch --tree-filter "rm aaa.txt" HEAD

This command will remove all the aaa.txt file in each commit. And the sha1 saved in refs in .git

If we regret the filter-branch process, we can use

$ git reset refs/original/refs/heads/master --hard

It will recover the sha1 value before filter-branch

### How to truly remove a file from git

After filter-branch, we still can use refs to recover the file, so

$ rm .git/refs/original/refs/heads/master

It removes this file, so that we cannot recover from it.

Then delete reflog, which stores all the commits sha-1 states

$ git reflog expire --all --expire=now

The above code advances the expire date to now

Then delete all deleted commits with

$ git gc --prune=now

Check any miscellaneous

$ git fsck

If empty, then we are done

### What if we want commit in other branch

Given there are two branches, master and second, as follow

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ho8PO4iiDP9crllA__GvLdg.png)
![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__MQZVe8jzapH__gUXmxAv0__A.png)

If we want to copy `217e18e` in second branch upon`7311241` in master, then in master branch, cherry-pick `217e18e`

$ git cherry-pick 217e18e

and the commits in master

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__x9aVsG4aqMcGxgsJezL8wg.png)

### Reference:

[**什麼是 Git？為什麼要學習它？ - 為你自己學 Git | 高見龍**  
_← 上一章：寫在最前面 - 為你自己學 Git！ 下一章：與其它版本控制系統的差異 → 如果你問大部份正在使用 Git 這個工具的人「什麼是 Git」，他們大多可能會回答你「Git 是一種版本控制系統」，專業一點的可能會回答你說「Git…_gitbook.tw](https://gitbook.tw/chapters/introduction/what-is-git.html "https://gitbook.tw/chapters/introduction/what-is-git.html")[](https://gitbook.tw/chapters/introduction/what-is-git.html)