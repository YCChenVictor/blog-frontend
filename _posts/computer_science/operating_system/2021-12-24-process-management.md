---
layout: post
title: process management
description: ''
date: '2021-12-24'
categories: OS
note:
publish: true
mermaid: true
---


## Introduction

With the help of PCB (Process Control Block), OS can manage tasks such as creation, scheduling, termination, deadlock. A PCB stores all the information about a process:

(drawing to be continued)

Add a PCB drawing here with list of elements such as process state, process number, program counter ...etc

The flow of PCB:

<div class="mermaid">
graph TB
  id1(new) --admitted--> id2(ready)
  
  subgraph processing
    id2(ready) --scheduler dispatch--> id3(running)
    id3(running) --interrupt--> id2(ready)
    id3(running) --I/O or event wait--> id5(waiting)
    id5(waiting) --I/O or event completion--> id2(ready)
  end

  id3(running) --exit--> id4(terminated)
</div>

## Why?

For multitasking

## How?

Explain the structure of PCB

## What?



## Reference

[Process control block](https://en.wikipedia.org/wiki/Process_control_block#:~:text=A%20process%20control%20block%20(PCB,a%20corresponding%20process%20control%20block.)

[Operating System: Process and Process Management](https://medium.com/@akhandmishra/operating-system-process-and-process-management-108d83e8ce60)

[Process Management in OS: PCB in Operating System](https://www.guru99.com/process-management-pcb.html)

[Process Control Block](https://www.youtube.com/watch?v=4s2MKuVYKV8)
