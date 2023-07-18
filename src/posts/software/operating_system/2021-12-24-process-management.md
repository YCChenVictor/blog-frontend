---
layout: post
title:
description: ''
date: '2021-12-24'
categories: OS
note:
mermaidJS: true
publish: true
---

## Introduction

TBC

## Why?

Understanding operating systems and properly managing processes allows for efficient code, improved system stability, concurrent system development, and effective issue identification and debugging.

## How?

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

### Flow of process

* Process Creation
  * Allocating resources: OS sets up address space, allocates memory, and creates a page table.
  * Initializing data structures: Process control block (PCB) is initialized with process details.
  * Setting up the environment: OS prepares initial program counter, stack pointer, and registers.
* Process Scheduling
  * Determines process execution order on the CPU.
  * Scheduler selects processes from the ready queue based on a scheduling algorithm.
  * Goal: Optimize CPU utilization, minimize response time, ensure fairness in resource allocation.
* Process Synchronization:
  * Essential for shared resource access and task cooperation.
  * Uses synchronization mechanisms (locks, semaphores, mutexes) to prevent conflicts.
  * Avoids race conditions, deadlocks, and data inconsistencies.
* Process Termination:
  * Occurs when a process finishes execution or is forcibly terminated.
  * Resources are released (memory, files, system resources).
  * Process control block is updated and associated data structures are deallocated.
* Process States, PCB, and Context Switching:
  * Processes exist in states like running, ready, blocked, or terminated.
  * PCB contains process information (state, priority, registers).
  * Context switching saves and restores process state for multitasking and concurrent execution.

### Process vs Thread

* Threads share the same resources of the process they belongs to, such as memory and files in the same process
* Processes take their own part of memory and cannot share memory with other process
* Communication between threads is faster than processes
* Threads are scheduled by the operating system, but they are not self-contained like processes.

### Concurrency

To boost user experience, we use concurrent execution of tasks to delegate works which will stuck the system to other machine, so that the system can still work smoothly and all heavy works can still be done. For more information, please refer to [concurrency]({{site.baseurl}}/mindset/2022/05/07/concurrency.html)

### Process Control Block (PCB)

The PCB is a critical component of process management in modern operating systems, allowing the operating system to manage and control multiple processes concurrently and efficiently. By maintaining a separate PCB for each process, the operating system can track and manage each process individually, ensuring that each process runs safely and efficiently.

With the help of PCB, OS can manage tasks such as creation, scheduling, termination, deadlock.

* When a process is created, the operating system allocates a PCB for that process and stores the relevant information about the process in that PCB. As the process runs, the operating system updates the PCB to reflect changes in the process state, memory allocation, CPU usage, and other parameters. It contains information about the state of a process, including its process ID, memory allocation, CPU usage, and other important parameters.
* The PCB is created when a process is initiated and is updated by the operating system as the process executes.
* The PCB is also used by the operating system to switch between processes and manage the scheduling of the CPU.

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

## Reference

[Process control block](https://en.wikipedia.org/wiki/Process_control_block)

[Operating System: Process and Process Management](https://medium.com/@akhandmishra/operating-system-process-and-process-management-108d83e8ce60)

[Process Management in OS: PCB in Operating System](https://www.guru99.com/process-management-pcb.html)

[Process Control Block](https://www.youtube.com/watch?v=4s2MKuVYKV8)
