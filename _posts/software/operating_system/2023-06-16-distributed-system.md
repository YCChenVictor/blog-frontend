---
layout: post
title:
description: ''
date: '2023-06-16'
categories:
note:
mathjax:
mermaidJS:
p5JS:
chartJS:
threeJS:
publish:
---

## Introduction

TBC

## Why?

Learning distributed systems is essential for understanding how to design, build, and manage robust and scalable applications that can handle the complexities of modern distributed environments.

## How?

### Distributed Computing Models

* client-server architecture
* peer-to-peer networks
* distributed file systems

### Distributed Data Storage

Understanding distributed data storage systems, including distributed databases, key-value stores, and distributed file systems.

### Distributed Algorithms

Studying algorithms and protocols specifically designed for distributed systems, such as leader election, mutual exclusion, and distributed locking.

### Distributed File Systems

Learning about distributed file systems like Hadoop Distributed File System (HDFS) or Google File System (GFS), including their architecture, data replication, and fault tolerance mechanisms.

### Communication and Coordination

Learning about message passing, remote procedure calls (RPC), distributed transactions, and consensus protocols for coordinating actions across multiple nodes.

### Fault Tolerance and Replication

Exploring techniques for fault tolerance, replication, and consistency in distributed systems, including approaches like replication, redundancy, and distributed consensus algorithms.

### Horizontally and Vertically Scalability

Horizontal scalability refers to the ability to increase the capacity of a system by adding more machines or nodes in a distributed manner, allowing for distributed processing and workload distribution. In contrast, vertical scalability involves increasing the resources of an individual machine or node, such as CPU, memory, or storage capacity, to handle increased workload and user demand. For more information, please refer to [Horizontally and Vertically Scalability]()

### Load Balancer

A load balancer is a critical component in computer networks and web infrastructure that evenly distributes incoming network traffic across multiple servers or resources. It helps optimize performance, improve reliability, and prevent overload by efficiently managing the workload across the system. For more information, please refer to [Load Balancer]()

### elastic resource management

### Distributed Security

Understanding security challenges in distributed systems, including authentication, access control, data privacy, and distributed security protocols.

### Cloud Computing and Virtualization

Exploring the concepts of cloud computing, virtualization technologies, and how they enable scalable and flexible distributed systems.

### Case Studies and Real-World Examples

Examining real-world distributed systems like Google's Bigtable, Apache Kafka, or Amazon DynamoDB to gain insights into the design and architecture of large-scale distributed applications.

## What?

## Other

* MapReduce (going to integrate this to above sections)
  * Purpose: Enable efficient processing and analysis of large-scale data by dividing tasks into parallelizable units, thereby leveraging the computing power of distributed systems and facilitating scalability, fault tolerance, and high-performance data processing.
  * Concept: A programming model where data is divided, processed, and combined in parallel across multiple nodes, consisting of a map phase to process data and generate intermediate results, followed by a reduce phase to aggregate and produce the final output.
  * Calculate the total sales amount for each product in a large dataset of customer transactions by mapping each transaction to key-value pairs of product and sales amount, and then reducing the intermediate results by summing the sales amounts for each product to obtain the final total. The trick here is that we can calculate the sub results at the same time in parallel.

## Reference
