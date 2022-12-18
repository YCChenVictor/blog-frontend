---
layout: post
title: thread and concurrency
description: ''
date: '2021-12-24'
categories: OS
note: Introduction 應該越剪短越好
mermaid: true
publish: true
---

## Introduction

The structure of this article:

* **Thread**: the smallest unit of program for CPU to execute.
* **Concurrency**: lets CPU perform multiple threads at the same time.
* **Process**: the program that has been loaded into memory along with registers (how to execute this process) and a program counter (what's the next process)
  * register may hold an instruction, a storage address, or other kind of data needed by the process (refer to [here](https://www.youtube.com/watch?v=fpnE6UAfbtU))
  * program counter (instruction pointer), a special type of register, storing the address of the instruction to be executed next

The flow:

<div class="mermaid">
graph TD
  id1(program) --compiled--> id2(binary form)
  id2(binary form) --loaded--> id3(memory)

  id3(memory) --decompose--> id4(process 1)
  id3(memory) --decompose--> id5(process 2)
  id3(memory) --...decompose--> id6(...other processes)
  
  id4(process 1) --decompose--> id7(thread 1)
  id4(process 1) --decompose--> id8(thread 2)
  id4(process 1) --...decompose--> id9(...other threads)

</div>

* threads share memory in the same process
* processes take their own part of memory and cannot share memory with other process
* communication between threads is faster than processes

## Why?

Concurrency decreases waiting time and response time and increase resource utilization and efficiency.

## How?

### decrease waiting time

### decrease response time

### increase resource utilization

### increase efficiency

## What?

## Reference

[Thread](https://www.computerhope.com/jargon/t/thread.htm)

[Thread (computing)](https://en.wikipedia.org/wiki/Thread_(computing))

[Multithreading and concurrency fundamentals](https://www.educative.io/blog/multithreading-and-concurrency-fundamentals)

[What’s the Diff: Programs, Processes, and Threads](https://www.backblaze.com/blog/whats-the-diff-programs-processes-and-threads/)

[Registers and RAM: Crash Course Computer Science #6](https://www.youtube.com/watch?v=fpnE6UAfbtU)
