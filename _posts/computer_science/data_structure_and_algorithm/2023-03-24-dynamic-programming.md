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

* Application: Dynamic programming is often used in problems where the solution can be expressed as a recursive sequence of sub-problems, such as finding the shortest path in a graph or the longest common subsequence of two strings. By solving each subproblem only once and storing its solution, dynamic programming algorithms can often solve large-scale optimization problems efficiently.
* Solution: Solve optimization problems by breaking them down into smaller, simpler sub-problems and solving each subproblem only once.
* Concept: The key idea behind dynamic programming is to store the solutions to sub-problems and reuse them when needed, rather than repeatedly recomputing the solutions

## Why?

The main advantage of dynamic programming is that it can often solve large-scale optimization problems efficiently. By breaking the problem down into smaller sub-problems and solving each subproblem only once, dynamic programming can avoid the repeated computations that would be necessary if the problem were solved using a brute-force approach.

Dynamic programming is used in a wide variety of fields, including computer science, mathematics, engineering, economics, and operations research. It is particularly useful in problems related to optimization, such as finding the shortest path in a graph, scheduling tasks, or maximizing profits.

## How?

### fibonacci

* recursive

```javascript
function fibonacci(n) {
  const memo = {};
  function fibonacciHelper(n) {
    console.log(n)
    console.log(memo)
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

### Maximum sub-array sum

* Please return the sub array that has biggest sum
* iterative

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
const array = [1, -3, 2, 1, -1];
const result = maxSubArraySum(array); // Returns 3
```

By storing the solutions to the subproblems, dynamic programming can avoid redundant calculations and improve the overall efficiency of the algorithm.

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

## Reference
