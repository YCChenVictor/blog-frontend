---
layout: post
title: process management
description: ''
date: '2021-12-24'
categories: OS
note: 要不斷的精簡與昇華文章
mermaid: true
publish: true
---

## Introduction

* A process is an instance of a program that is executing on a computer. Each process has its own memory space and runs independently of other processes.
* Process management involves creating, scheduling, and managing processes to ensure that they run efficiently and don't interfere with each other.
* Process management also manages the state of each process, including whether it is running, blocked, or waiting for input. In addition, the process management system is responsible for terminating processes when they are no longer needed.
* One of the key functions of process management is CPU scheduling, which involves determining which process should be executed next. The scheduler allocates the CPU to the most deserving process, based on a set of predefined criteria, such as priority or time slice.
* By managing processes properly, the operating system can ensure that resources are used efficiently and that processes run smoothly.

## Why?

* Understanding operating systems: Processes are a fundamental concept in operating systems
* Writing efficient code: By managing processes properly, you can improve system performance and reduce resource utilization.
* Improving system stability: By managing processes properly, you can prevent crashes and other issues that can affect system stability.
* Developing concurrent systems: Allows multiple tasks to execute simultaneously. You can design and implement systems that make efficient use of system resources and improve system performance.
* Understanding process management can help you identify issues and debug code more effectively.

## How?

### PCB data structure

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

### Flow

* Process creation (the process of creating a new process in an operating system)
  * Allocating resources: Sets up a new address space for the process, including allocating memory and creating a page table to map the process's virtual address space to physical memory
  * Initializing data structures: Initializes the process control block (PCB), which is a data structure that contains information about the process, including its process ID, state, and resource usage.
  * Setting up the necessary environment
  * Typically created by a parent process, which may pass parameters to the child process or inherit some of its own properties. For example, a new process may inherit the file descriptors of its parent, allowing it to read and write to the same files.
* process scheduling
* process synchronization
* process termination
* process states, process control blocks, and context switching.

### CPU scheduling algorithms

CPU scheduling is a critical part of process management, and you should understand the different CPU scheduling algorithms such as Round Robin, FCFS, SJF, and Priority Scheduling. You should also learn about their advantages and disadvantages.

### Memory Management

Learn about memory allocation, fragmentation, and virtual memory.

### OS Simulation Tools

Process Explorer allows us to see the running processes and their resource utilization.

### Thread

* A lightweight execution unit that exists within a process
* A process can have multiple threads, and each thread can perform a different task, but they all share the same resources of the process, such as memory and files.
* Threads are scheduled by the operating system, but they are not self-contained like processes.

### Issues

#### Resource Allocation

* Description: Resource starvation or overloading caused by failing to manage resource efficiently for different processes, which require different amounts of CPU, memory, disk space, network bandwidth, and other resources
* Solution: To manage resources effectively, you can use tools like task queues, load balancers, and resource allocation algorithms. You can also monitor the system's resource usage and adjust the allocation based on the workload.

#### Deadlocks

* Description: A deadlock occurs when two or more processes are blocked waiting for each other to release a resource. Deadlocks can lead to a system freeze, where no progress is made, and the processes become unresponsive
* Solutions (order with frequency)
  * Mutual Exclusion
    * Description: Two resources, A and B, and two processes, P1 and P2, that need access to both resources in order to complete their tasks. However, if both processes acquire one resource and then try to acquire the other, they may end up deadlocked, where neither process can proceed because they are both waiting for the other to release the resource it is holding.
    * Solution: Give each resource a lock. That is, processes P1 or P2 must gain the lock of each resource, then they can start to process, which means P1 and P2 are mutual exclusive
    * Code example:
      ```javascript
      // Create a Mutex object
      const mutex = new Mutex();

      // Acquire the lock
      mutex.acquire().then(function() {
        // Critical section
        // Code here will be executed by only one thread at a time
        // Release the lock
        mutex.release();
      });

      // Mutex object is created and then the acquire() method is called to acquire the lock. If the lock is currently held by another thread, the acquire() method will block until it is released. Once the lock is acquired, the critical section of code is executed. Once the critical section is complete, the release() method is called to release the lock and allow other threads to acquire it.
      ```
  * Deadlock detection and recovery algorithms: These are widely used in many operating systems and databases to detect and recover from deadlocks.
  * Resource allocation policies: These policies are commonly used to allocate resources in a way that minimizes the risk of deadlocks. For example, some systems use priority-based scheduling to give higher priority to processes that are less likely to cause deadlocks.
  * Message passing: This technique is often used in distributed systems to ensure that processes can communicate with each other without the risk of deadlocks.
  * Lock-free programming: This technique is gaining popularity in highly concurrent systems because it avoids the need for locks and can improve performance.
  * Transactional memory: This is a relatively new technique that is gaining popularity in highly concurrent systems because it allows for fine-grained locking and can improve performance.
  * Hold and Wait: This strategy can be effective in some situations, but it can also be prone to deadlocks if not used carefully.
  * No Preemption: This strategy can prevent deadlocks, but it can also lead to resource starvation in certain situations.
  * Circular Wait: This strategy can be effective, but it requires careful resource allocation and ordering to prevent deadlocks.
    * Mutual Exclusion and Hold and Wait are relatively simple to implement but can be more prone to deadlocks if used improperly
    * No Preemption can prevent deadlocks but can also lead to resource starvation in certain situations
    * Circular Wait can be effective, but it requires careful resource allocation and ordering to prevent deadlocks.
    * Techniques like lock-free programming, transactional memory, and message passing can be more complex to implement but can offer higher performance and scalability. * Deadlock detection algorithms and resource allocation policies can also be effective in detecting and resolving deadlocks in a system.

article in clean code

#### Race Conditions

* Description: A race condition occurs when two or more processes access a shared resource concurrently, and the outcome depends on the order of execution
* Solution: To prevent race conditions, you can use synchronization techniques like locks, semaphores, and barriers. You can also use atomic operations and message passing to ensure that shared resources are accessed safely and consistently.

#### Priority Inversion

* Description: Priority inversion is a situation where a low-priority process holds a resource that a high-priority process needs, leading to a delay in the high-priority process's execution. This problem is particularly prevalent in real-time systems.
* Solution: To prevent priority inversion, you can use techniques like priority inheritance, priority ceiling, and preemptive scheduling. These techniques ensure that high-priority processes get access to the resources they need without being delayed by low-priority processes.
#### Process Synchronization

* Processes may need to synchronize their activities to ensure correct and consistent behavior. Synchronization problems can arise when processes access shared resources, communicate with each other, or perform parallel computations.
* Solution:

#### Fault Tolerance

* Process management may need to handle faults and failures gracefully to maintain system availability and reliability. Fault tolerance mechanisms include process restarts, redundancy, and error detection and recovery.
* Solution:

#### Security

* Process management needs to enforce access control and protect against unauthorized access, malicious attacks, and other security threats.
* Solution:

## What?

Give me a real world example

### Javascript



## Reference

[Process control block](https://en.wikipedia.org/wiki/Process_control_block)

[Operating System: Process and Process Management](https://medium.com/@akhandmishra/operating-system-process-and-process-management-108d83e8ce60)

[Process Management in OS: PCB in Operating System](https://www.guru99.com/process-management-pcb.html)

[Process Control Block](https://www.youtube.com/watch?v=4s2MKuVYKV8)
