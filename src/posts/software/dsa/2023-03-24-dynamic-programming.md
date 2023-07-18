---
layout: post
title:
description: ''
date: '2023-03-24'
categories: DSA
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

(TBC)

## Why?

Dynamic programming offers an efficient solution to large-scale optimization problems by breaking them into smaller sub-problems and avoiding repetitive computations, making it applicable across various disciplines including computer science, mathematics, engineering, economics, and operations research.

## How?

### Steps

For example, given an integer array, [1, -2, 3, 4, -1, 2, 1, -5, 4], find the continuous sub array which has the largest sum.

* Identify the optimal substructure
  * Concept: Given the full array, try to destruct it to sub array, so that we can have the relation of $$F(array) = M(F(sub array), xxx)$$
  * Example:
    * i = 0, the continuos sub array = [1]
    * i = 1, the continuous sub array = [1, -2], [-2]
    * i = 3, the continuous sub array = [1, -2, 3], [-2, 3], [3]
    * i = 4, the continuous sub array = [1, -2, 3, 4], [-2, 3, 4], [3, 4], [4]
    * ...
    * As you can see, max sub array of a given array can be finding the max sub array of the sub array (removing last element) and adds-on element to the sub arrays of last set.
* Formulate the recurrence relation
  * Concept: Given last step, we can try to formulate it.
  * Example: $$F(array[0..i]) = max(array[i], F(array[0..i-1]) + array[i])$$
* Define the base case
  * $$F(array[0]) = array[0]$$
* Design the dynamic programming algorithm
  * Concept: Try to write pseudocode first
  * pseudocode
    ```javascript
    function xxx(array) {
      result = 0
      F = []
      F[0] = array[0]
      for (i in 0~len(array) - 1) {
        F[i] = max(array[i], F[i - 1] + array[i])
        result = max(result, F[i])
      }

      return result
    }
    ```
* Implement the algorithm
  ```javascript
  function maxSubArraySum(arr) {
    const dp = [];
    dp[0] = arr[0];
    let maxSum = dp[0];
    
    for (let i = 1; i < arr.length; i++) {
      dp[i] = Math.max(arr[i], dp[i - 1] + arr[i]);
      maxSum = Math.max(maxSum, dp[i]);
    }
    
    return maxSum;
  }
  
  // Example usage:
  const array = [1, -2, 3, 4, -1, 2, 1, -5, 4];
  const result = maxSubArraySum(array);
  ```
* Analyze the time and space complexity
  * Since it will only loop through all element once, the time complexity is O(n)

### Recursive vs. Iterative Solutions

All recursive algorithms can be implemented iteratively. If the recursive solution takes too much memory, we can consider solve it iteratively.

For example, we can calculate `factorial` with recursive and iterative method as follow:

```javascript
function factorialRecursive(n) {
  if(n == 1) {
    return 0
  } else {
    return n * factorialRecursive(n - 1)
  }
}

function factorialIterative(n) {
  result = 1
  for (let i = 1; i <= n; i ++) {
    result = result * i
  }
  return result
}
```

### fibonacci

* Concept
  ```bash
  f(n) = f(n - 1) + f(n - 2)
  ```
* Recursive
  ```javascript
  function fibonacci(n) {
    const memo = {};
    function fibonacciHelper(n) {
      if (n <= 1) {
        return n;
      } else if (n in memo) {
        return memo[n];
      } else {
        memo[n] = fibonacciHelper(n-1) + fibonacciHelper(n-2);
        return memo[n];
      }
    }
    return fibonacciHelper(n);
  }
  
  console.log(fibonacci(10)); // Output: 55
  ```
* Time complexity: O(n) because with memo, I only need to know f(n), ... f(1)

### Triple Step

* Problem: A child is running up a staircase with n steps and can hop either 1 step, 2 steps, or 3 steps at a time, implement a method to count how many possible ways the child can run up the stairs.
* Concept (important dynamic programming concept): When the child hops on 5, we can guess this child hop 1, hop 2, or hop 3
  * hop 1 => must hop to 4 before => the ways(4)
  * hop 2 => must hop to 3 before => the ways(3)
  * hop 3 => must hop to 2 before => the ways(2)
  * As a result, we can conclude that ways(n) = ways(n-1) + ways(n-2) + ways(n-3)
* Solution:
  ```javascript
  function childHop(n) {
    if (n == 1) {
      // [1]
      return 1
    } else if (n == 2) {
      // [1, 1], [2]
      return 2
    } else if (n == 3) {
      // [1, 1, 1], [2, 1], [1, 2], [3]
      return 4
    } else {
      return childHop(n - 3) + childHop(n-2) + childHop(n-1)
    }
  }

  // childHop(5) = 13
  ```
* Test
  ```javascript
  // TBC
  ```

### Robot in a Grid

### Robot in a Grid

### Power Set

### Recursive Multiply

### Towers of Hanoi

### Permutations without Dups

### Permutations with Dups

### Parens

### Paint Fill

### Coins

### Eight Queens

### Stack of Boxes

### Boolean Evaluation

### 0/1 Knapsack problem

TBC

## What?

### resource allocation

* Problem: Allocates scarce resources in the most efficient way possible to maximize the overall benefit or profit. The problem can be represented as a table where the rows represent the projects and the columns represent the available budget. The table is filled out in a bottom-up manner, where each cell represents the maximum profit that can be obtained for a given budget and a subset of projects. Resource allocation problems can arise in many different fields, such as in supply chain management, healthcare, and environmental management. By using dynamic programming to optimize resource allocation, businesses and organizations can make more informed decisions and achieve better outcomes.
* Example: Consider a company that has a limited budget and needs to allocate its resources (e.g., money, manpower, equipment) across different projects to maximize profits.
* Solution: Use dynamic programming solve this problem by breaking it down into smaller sub-problems and optimizing each subproblem independently. By computing the values in the table for all possible combinations of projects and budgets, the optimal solution can be found by selecting the combination of projects with the highest profit that also fits within the budget constraints.
* Code: Suppose we have a list of n tasks, each with an associated profit and time required. We also have a limited amount of time available to complete tasks. Our goal is to choose a subset of tasks to complete in the allotted time that maximizes the total profit. We can use dynamic programming to solve this problem by building a table where the rows represent the tasks and the columns represent the available time. We fill out the table in a bottom-up manner, computing the maximum profit that can be obtained for each subset of tasks and time.

We want to find the most profitable tasks in a give time as follow

```javascript
const time = 5; // it can be changed

const tasks = [
  { name: 'Task A', profit: 2, time: 1 },
  { name: 'Task B', profit: 3, time: 2 },
  { name: 'Task C', profit: 4, time: 3 },
  { name: 'Task D', profit: 5, time: 4 },
];
```

The algorithm will construct table:

```javascript
[
  [ 0, 0, 0, 0, 0, 0 ],
  [ 0, 2, 2, 2, 2, 2 ],
  [ 0, 2, 3, 5, 5, 5 ],
  [ 0, 2, 3, 5, 6, 7 ],
  [ 0, 2, 3, 5, 6, 7 ],
]
```

where row is accumulated profit of projects on given time (columns)

And use dynamic programming:

* It will start from table[4][5], which has value of 7, the maximum profit the time limit can obtain
* Then extracts the solution by backtracking from the last cell of the table
* Avoiding the repetition of sub-problems, recomputing the maximum profit that can be obtained for the same accumulated projects and time limit, which occurs multiple times if a recursive or a brute-force approach were used
* Time complexity = O(n * time)

```javascript
function allocateResources(tasks, time) {
  const n = tasks.length;
  const table = Array.from({ length: n + 1 }, () => Array(time + 1).fill(0));

  // construct desired structure
  // Rows are the accumulated projects and column are the limit of time
  for (let i = 1; i <= n; i++) {
    const { profit, time: taskTime } = tasks[i - 1];
    for (let j = 1; j <= time; j++) {
      if (taskTime > j) {
        table[i][j] = table[i - 1][j];
      } else {
        table[i][j] = Math.max(table[i - 1][j], profit + table[i - 1][j - taskTime]);
      }
    }
  }

  const solution = [];
  let i = n, j = time;
  while (i > 0 && j > 0) {
    if (table[i][j] === table[i - 1][j]) {
      i--;
    } else {
      const { profit, time: taskTime } = tasks[i - 1];
      solution.unshift(tasks[i - 1]);
      i--;
      j -= taskTime;
    }
  }

  return { maxProfit: table[n][time], solution };
}

const time = 5;

const tasks = [
  { name: 'Task A', profit: 2, time: 1 },
  { name: 'Task B', profit: 3, time: 2 },
  { name: 'Task C', profit: 4, time: 3 },
  { name: 'Task D', profit: 5, time: 4 },
];

const { maxProfit, solution } = allocateResources(tasks, time);

console.log(`Max profit: ${maxProfit}`);
console.log(`Solution: ${solution.map(task => task.name).join(', ')}`);
```

## TODO

* dynamic programming
  * longest increasing subsequence
  * 0/1 knapsack problem
  * Shortest path algorithms:
  * Longest common subsequence
  * Matrix chain multiplication
  * Edit distance

## Reference

[0/1 Knapsack Problem Dynamic Programming](https://www.youtube.com/watch?v=8LusJS5-AGo)

[Knapsack Problem](https://web.ntnu.edu.tw/~algo/KnapsackProblem.html)
