---
layout: post
title:
description: ''
date: '2023-05-03'
categories:
note:
mathjax:
mermaid:
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

### Check Permutation (String)

* Question: Given two strings, write a method to decide if one is a permutation of the other.
* Brute force:
  ```javascript
  function checkPermutation(string1, string2) {
    for (var i = 0; i < string1.length; i++) {
      target = string1[i]
      for (var i = 0; i < string2.length; i++) {
        if (string2[i] == target) {
          remove string2[i] from string2
        }
      }
    }
    if len(string2[i]) == 0 {
      return true
    } else {
      return false
    }
  }
  ```
* Unnecessary work: none
* Bottleneck: the place with highest complexity is the nested for loop. To solve it, my first though is hash table
  ```javascript
  function checkPermutation(string1, string2) {
    hash_table = {}
    for (var i = 0; i < string1.length; i++) {
      if hash_table[string[i]] = null {
        hash_table[string[i]] = 1
      } else {
        hash_table[string[i]] += 1
      }
    }
    for (var i = 0; i < string2.length; i++) {
      hash_table[string[i]] -= 1
    }
  
    if hash_table.values = 0 {
      return true
    } else {
      return false
    }
  }
  ```
  * Given the length of string1 is A and length of string2 is B, the complexity is $$O(A+B)$$.
  * We also can sort them first and compare the first n elements of characters.
* Duplicate Work: none
* Real world example: none
* More general solution: none
* Best time complexity: We need to at least check all the letters, so the best time complexity is $$O(A+B)$$
* Stack up: none
* Test
  ```javascript
  checkPermutation = require('../examples/check_permutation.js')

  describe('checkPermutation', () => {
    test('s1 = wqer, s2 = rewq', () => {
      expect(checkPermutation('wqer', 'rewq')).toEqual(true)
    })
  
    test('s1 = asfd, s2 = rewq', () => {
      expect(checkPermutation('asdf', 'rewq')).toEqual(false)
    })
  })
  ```
* result
  ```javascript
  function checkPermutation(string1, string2) {
    const hash_table = {}
    for (let i = 0; i < string1.length; i++) {
      if(hash_table[string1[i]] = null) {
        hash_table[string1[i]] = 1
      } else {
        hash_table[string1[i]] += 1
      }
    }
    for (let i = 0; i < string2.length; i++) {
      hash_table[string2[i]] -= 1
    }
    return Object.values(hash_table).every(element => element === 0)
  }
  ```

## What?

## Reference
