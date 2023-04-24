---
layout: post
title:
description: ''
date: '2023-04-23'
categories: DSA
note:
mathjax:
mermaid: true
p5:
threeJS:
anchor:
publish: true
---

## Introduction

quick explanation

## Why?

focus on why we need it

## How?

The data flow:

<div class="mermaid">
graph LR
  id1(value 1) --> id4(hash<br>function)
  id2(value 2) --> id4(hash<br>function)
  id3(value 3) --> id4(hash<br>function)

  id4(hash<br>function) -- insert value 1 --> id5(key 0)
  id4(hash<br>function) -- insert value 2 --> id7(key 1)
  id4(hash<br>function) -- insert value 3 --> id7(key 2)
  subgraph Buckets
    id5(key 0)
    id6(key 1)
    id7(key 2)
    id8(key 3)
    ...
  end

  id5(key 0) --> id9(value 1)
  id7(key 2) --> id10(value 2)
  id10(value 2) --> id11(value 3)
</div>

The value will be calculated by certain method in hash function to get the key of buckets and then connects the value with linked list if the mapping key is the same.

Given the length of buckets is N, meaning there are N keys, if we want to search an element, it will first pass the element into hash function to get the key for certain linked list and then search through the linked list.

The time complexity = $$O(A + B)$$, where A is the length of bucket and B is the length of linked list. A is actually 1 because the magic of hash function and B is usually close to 1 if we making the collisions, meaning values map to same key, as low as possible. As a result, the time complexity is actually $$O(1)$$
## What?

Real world example: counting the words of an article

```javascript
class WordCounter {
  constructor() {
    this.wordCountMap = new Map();
  }

  countWords(article) {
    const words = article.trim().split(/\s+/);
    for (const word of words) {
      const normalizedWord = word.toLowerCase();
      const count = this.wordCountMap.get(normalizedWord) || 0;
      this.wordCountMap.set(normalizedWord, count + 1);
    }
  }

  getWordCount(word) {
    const normalizedWord = word.toLowerCase();
    return this.wordCountMap.get(normalizedWord) || 0;
  }

  getTopWords(limit) {
    const sortedEntries = Array.from(this.wordCountMap.entries()).sort((a, b) => b[1] - a[1]);
    return sortedEntries.slice(0, limit).map(([word, count]) => ({ word, count }));
  }
}
```

## Reference

Why: asking for the reason or purpose behind something.
How: asking for the method or process of doing something.
What: asking for information about a specific thing or object.
