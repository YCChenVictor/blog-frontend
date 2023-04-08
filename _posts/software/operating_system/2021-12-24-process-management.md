---
layout: post
title: process management
description: ''
date: '2021-12-24'
categories: OS
note:
mermaid: true
publish: true
---

## Introduction

* A process is an instance of a program that is executing on a computer. Each process has its own memory space and runs independently of other processes.
* Process management involves creating, scheduling, and managing processes. Process management is responsible for managing the execution of processes to ensure that they run efficiently and don't interfere with each other.
* The system also manages the state of each process, including whether it is running, blocked, or waiting for input. In addition, the process management system is responsible for terminating processes when they are no longer needed.
* One of the key functions of process management is CPU scheduling, which involves determining which process should be executed next. The scheduler allocates the CPU to the most deserving process, based on a set of predefined criteria, such as priority or time slice.
* By managing processes properly, the operating system can ensure that resources are used efficiently and that processes run smoothly.

## Why?

* Understanding operating systems: Processes are a fundamental concept in operating systems
* Writing efficient code: By managing processes properly, you can improve system performance and reduce resource utilization.
* Improving system stability: By managing processes properly, you can prevent crashes and other issues that can affect system stability.
* Developing concurrent systems: Allows multiple tasks to execute simultaneously. You can design and implement systems that make efficient use of system resources and improve system performance.
* Understanding process management can help you identify issues and debug code more effectively.

## How?

### Flow

* process creation

Process creation is the process of creating a new process in an operating system. It involves allocating resources, initializing data structures, and setting up the necessary environment for the process to execute.

When a process is created, the operating system sets up a new address space for the process, including allocating memory and creating a page table to map the process's virtual address space to physical memory. The operating system also initializes the process control block (PCB), which is a data structure that contains information about the process, including its process ID, state, and resource usage.

The new process is typically created by a parent process, which may pass parameters to the child process or inherit some of its own properties. For example, a new process may inherit the file descriptors of its parent, allowing it to read and write to the same files.

Process creation is a complex process that involves a number of steps, including allocating resources, initializing data structures, and setting up the necessary environment for the process to execute. It is a critical component of process management, as the creation of new processes allows the operating system to execute multiple tasks simultaneously and make efficient use of system resources.


* process scheduling
* process synchronization
* process termination
* process states, process control blocks, and context switching.

The PCB is a critical component of process management in modern operating systems, allowing the operating system to manage and control multiple processes concurrently and efficiently. By maintaining a separate PCB for each process, the operating system can track and manage each process individually, ensuring that each process runs safely and efficiently.

With the help of PCB (Process Control Block), OS can manage tasks such as creation, scheduling, termination, deadlock.

* A Process Control Block (PCB) is a data structure used by the operating system to manage and control the execution of a process. It contains information about the state of a process, including its process ID, memory allocation, CPU usage, and other important parameters.
* The PCB is created when a process is initiated and is updated by the operating system as the process executes.
* The PCB is also used by the operating system to switch between processes and manage the scheduling of the CPU.
* When a process is created, the operating system allocates a PCB for that process and stores the relevant information about the process in that PCB. As the process runs, the operating system updates the PCB to reflect changes in the process state, memory allocation, CPU usage, and other parameters.

How PCB flows:

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

### CPU scheduling algorithms

CPU scheduling is a critical part of process management, and you should understand the different CPU scheduling algorithms such as Round Robin, FCFS, SJF, and Priority Scheduling. You should also learn about their advantages and disadvantages.

### Memory Management

Learn about memory allocation, fragmentation, and virtual memory.

### OS Simulation Tools

Process Explorer allows us to see the running processes and their resource utilization.

### 

## What?

### Coding

Practice coding by implementing basic process management algorithms such as process scheduling or process synchronization.

## Reference

[Process control block](https://en.wikipedia.org/wiki/Process_control_block)

[Operating System: Process and Process Management](https://medium.com/@akhandmishra/operating-system-process-and-process-management-108d83e8ce60)

[Process Management in OS: PCB in Operating System](https://www.guru99.com/process-management-pcb.html)

[Process Control Block](https://www.youtube.com/watch?v=4s2MKuVYKV8)
