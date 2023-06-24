---
layout: post
title:
description: ''
date: '2023-06-16'
categories:
note: this article can be related to distributed system
mathjax:
mermaidJS:
p5JS:
chartJS:
threeJS:
publish: true
---

## Introduction

This article emphasizes the importance of learning about horizontal and vertical scalability to handle increasing workloads efficiently, maintain system performance and availability, and achieve cost efficiency. It explains the concepts of horizontal and vertical scalability, providing examples and considerations for choosing the appropriate scaling approach based on factors such as workload nature, performance requirements, cost considerations, and system architecture, followed by code examples demonstrating horizontal and vertical scaling in a Node.js project.

## Why?

Learning about horizontal and vertical scalability is essential to efficiently handle increasing workloads, maintain system performance and availability, and achieve cost efficiency in computer systems and software engineering.

## How?

### Concept

* Horizontal scalability (scale-out)
  * Purpose: Increase the capacity of a system
  * Concept: Adding more machines or nodes in a distributed manner, allowing for improved workload distribution, increased throughput, and enhanced fault tolerance.
  * Example: Add more web servers to app's cluster, allowing for better load distribution and improved fault tolerance.
* Vertical Scalability (scale-up)
  * Purpose: Increase the capacity of a system
  * Concept: Adding more resources, such as CPU, memory, or storage, to a single machine or node, enabling it to handle larger workloads and support higher performance requirements.
  * Example: Upgrade the server's resources, such as adding more CPU cores, increasing memory capacity, or improving storage performance.
* Horizontal vs Vertical
  * Purpose: Find the best solution with least cost
  * Concept: The choice depends on various factors
    * Nature of the workload
    * Performance requirements
    * Cost considerations
    * Architecture of the system
  * Example
    * Cost: Horizontal scaling < Vertical scaling
      * Horizontal scaling involves adding commodity hardware, which can be cost-effective.
      * Vertical scaling requires investing in high-end hardware, which can be more expensive.
    * Scalability requirements: predictable or not
      * If workload is predictable, vertical scaling can be sufficient.
      * If workload is not predictable, horizontal scaling may provide better scalability with the ability to add more machines as needed.
    * System architecture
      * If the system is already distributed and designed for horizontal scalability, it may be easier to continue scaling horizontally.
      * If the system is designed around a single powerful server, vertical scaling may be the preferred option.

## What?

### Horizontal Scaling (Scale-Out)

In a node project,

```javascript
// File: server.js

const http = require('http');
const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  // Create a worker process for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Fork a new worker if a worker process dies
    cluster.fork();
  });
} else {
  // Create and start your Node.js server
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!');
  });

  server.listen(3000, () => {
    console.log(`Server running on process ${process.pid}`);
  });
}
```

### Vertical Scaling (Scale-Up)

```javascript
// File: server.js

const express = require('express');

const app = express();

// Set up your routes and middleware

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Example of vertical scaling by upgrading resources
function upgradeServer() {
  // Upgrade CPU, memory, or storage resources as needed
  // ...

  // Close the existing server and start a new server with upgraded resources
  server.close(() => {
    const upgradedServer = app.listen(3000, () => {
      console.log('Upgraded server running on port 3000');
    });
    server = upgradedServer;
  });
}

// Call upgradeServer() when resource upgrade is required
```

## Reference
