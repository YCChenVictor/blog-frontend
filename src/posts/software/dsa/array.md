# Title

## Purpose

Array is one of the most fundamental and widely used data structures, offering efficient storage and retrieval, simple implementation, versatility, efficiency, and being widely used in many fields of computer science.

## Concept

### String

Because the algorithm of string is just like arrayList, so I will put string algorithm in arrayList.

### Array vs ArrayList

An array is a fixed-size data structure, while an ArrayList is a dynamic, resizable data structure.

### Basic Form

In javascript,

#### Example

```javascript
[1, 2, 3, 4]
```

* Data: A collection of elements of the **same data type**, arranged in a contiguous block of memory

#### Time complexity

* Create an element: O(1) to O(N)
  * Inserting an element at the end of an arrayList has O(1) but may be O(N) if we need to resize the arrayList
  * Inserting an element at the beginning of an arrayList has O(N) because we need to shift all the elements
* Read an element: O(1)
  * Given an index i, the read operation in an ArrayList retrieves the element at that index in constant time, regardless of the size of the ArrayList because the addresses of the items are stored **continuously** in memory, which means it can access other addresses by quick calculation of `memory_address = base_address + (index * element_size)`.
* Update an element: O(1)
  * Given an index i and a new value v, the update operation in an ArrayList replaces the element at index i with the new value v in constant time, regardless of the size of the ArrayList.
* Delete an element: O(1) to O(N)
  * In the worst case, where n is the number of elements in the ArrayList because deleting an element requires shifting all subsequent elements one position to the left to fill the gap left by the deleted element. Deleting the last element in an ArrayList has a time complexity of O(1) on average because it can be done by simply updating the size of the ArrayList.

### Is Unique (string)

#### BUD

* Question: Implement an algorithm to determine if a string has all unique characters
* Brute force:

```javascript
s = 'example'
function charactersIsUnique(s) {
  if(typeof s != 'string') {
    return 'type error';
  }
  for (var i = 0; i < s.length; i++) {
    for (var j = 0; j < s.length; i++) {
      if (s[i] == s[j]) {
        return 'not unique'
      } else {
        continue;
      }
    }
  }
  return 'unique'
}

charactersIsUnique(s)
```

The above code is brute force solution with edge case considered. The time complexity = $$O(N^2)$$

* unncessary work: actually, for any character, we only need to compare the characters on their right-hand side, so we can rewrite it as follow:

```javascript
s = 'example'
function charactersIsUnique(s) {
  if(typeof s != 'string') {
    return 'type error'
  }
  for (var i = 0; i < s.length; i++) {
    for (var j = i+1; j < s.length; i++) {
      if (s[i] == s[j]) {
        return 'not unique'
      } else {
        continue;
      }
    }
  }
  return 'unique'
}

charactersIsUnique(s)
```

Then the number of times will be $$N + (N-1) + ... + 1 = N(1+N)/2$$; however, the time complexity is still $$O(N^2)$$

* Bottleneck: the place with highest time complexity is the nested for loops, so we should try to use only one for loop. What we can do here is use a hash as follow:

```javascript
string = 'example'
function charactersIsUnique(s) {
  object = {}
  if(typeof s != 'string') {
    return 'wrong type'
  }
  for (var i = 0; i < s.length; i++) {
    if(object.hasOwnProperty(s[i])) {
      return 'not unique'
    } else {
      object[s[i]] = 1
    }
  }
  return 'unique'
}

charactersIsUnique(s)
```

Then the time complexity reduces to $$O(N)$$

#### real world example

Let's say we have a stack of test papers and teacher wants to find the students with same name to make sure there is no mistake when we record the scores. What the teacher may do are
1. take notes of all the names walked through and check it first every next student comes (like the example above)
2. sort the papers with the order of names and it is easy to find out duplicate names. (check the [sorting section]({{site.baseurl}}/dsa/2023/03/09/sorting.html)) But actually there is no sorting method lower or equal to O(N)

#### general solution

I think the solution above is general enough

#### stack up

Is there a recursive solution? seems not

#### best time complexity

We at least need to walk through all letters, so it is at least O(N). And we actually only need to walk through once.

#### Test

```javascript
describe('Is Unique', () => {
  describe('s = example', () => {
    let s = 'example'
    expect(charactersIsUnique(s)).toEql(false)
  })
  describe('s = fast', () => {
    let s = 'fast'
    expect(charactersIsUnique(s)).toEql(true)
  })
})
```

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

### Binary Search

```javascript
function binarySearch(array, target) {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midValue = array[mid];

    if (midValue === target) {
      return mid; // Target found, return the index
    } else if (midValue < target) {
      low = mid + 1; // Target is in the right half of the remaining array
    } else {
      high = mid - 1; // Target is in the left half of the remaining array
    }
  }

  return -1; // Target not found
}

// Usage example:
const sortedArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const targetValue = 23;

const resultIndex = binarySearch(sortedArray, targetValue);
if (resultIndex !== -1) {
  console.log(`Target value ${targetValue} found at index ${resultIndex}.`);
} else {
  console.log(`Target value ${targetValue} not found in the array.`);
}
```

### URLify

* Question: Write a method to replace all spaces in a string with '%20'. You may assume that the string has sufficient space at the end to hold the additional characters, and that you are given the "true" length of the string.
* Example:
  * Input: "Mr John Smith ", 13
    * 13 is the length of the original string "Mr John Smith" excluding any trailing white spaces
  * Output: "Mr%20John%20Smith"
* brute force:
  ```javascript
  function URLify(string, length) {
    result = ''
    for (var i = 0; i < length; i ++) {
      if (i + 1 === length) {
        break
      } else if (string[i] === ' ') {
        result += '%20'
      } else {
        result += string[i]
      }
    }
  }
  ```

The time complexity = $$O(N + N)$$ = $$O(N)$$

* unnecessary work: On higher point of view, the loop to calculate `numberOfNotSpace` must be more unnecessary and the truth is we only need to break the loop if the loop meets space twice as follow:

```javascript
function URLify(string, length) {
  lastLetter = ''
  for (var i = 0; i < string.length; i++) {
    lastLetter = string[i]
    result = ''
    if (string[i] != ' ') {
      result += string[i]
    } else {
      result += '%20'
      if lasterLetter == '' {
        break
      }
    }
  }
}
```

Then the time complexity = $$O(N)$$.

### Palindrome Permutation

* Question: Given a string, write a function to check if it is a permutation of a palindrome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.
* brute force:
  ```javascript
  function Palindrome(string) {
    diatonic = ''
    for (var i = 0; i < string.length; i++) {
      if (string[i] != ' ') {
        diatonic += string[i].lowercase
      }
    }
    chromatic = ''
    for (var i = array.length; i--;) {
      if (string[i] != ' ') {
        chromatic += string[i].lowercase
      }
    }
  
    if diatonic == chromatic {
      return true
    } else {
      return false
    }
  }
  ```

The time complexity = $$O(N + N)$$ = $$O(N)$$

* unnecessary work: actually, if it is Palindrome, then the first half of the first loop is just like the last half of the second loop, so we may can optimize it with

```javascript
function Palindrome(string) {
  for (var i = 0; i < string.length; i++) {
    if (string[i] == ' ') {
      continue
    } elsif (string[i] == string[-i]) { // the correct way to call string[-i] is string.charAt(string.length - (i+1))
      continue
    } else {
      return false
    }
  }
}
```

Then the time complexity = $$O(N)$$. We can also try to break it at the point of middle, then the time complexity = $$O(N/2)$$

## What?

Real-world problem that uses an arrayList data structure and algorithm

* I want to create a search bar to search keyword on my website
* I need to use array to store the posts
  ```javascript
  const posts = [
    { title: "My first post", content: "This is my first post on the platform!", author: "Alice" },
    { title: "Cool photo", content: "Check out this cool photo I took on my vacation.", author: "Bob" },
    { title: "Important announcement", content: "We have an important announcement to make...", author: "Admin" }
  ];
  ```
* Implement the search function
  ```javascript
  function searchPosts(keyword) {
    const results = [];
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      
      if (post.title.includes(keyword) || post.content.includes(keyword)) {
        results.push(post);
      }
    }
    
    return results;
  }
  const results = searchPosts("vacation");
  console.log(results);
  ```

## Reference

cracking the coding interview
