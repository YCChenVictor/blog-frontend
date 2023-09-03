# Title

## Purpose

The purpose is to let a class to create only one instance in the run time and provide a global point of access to that instance.

## Concept

You should create a class having a method instance to check whether there is an instance created and all the global pointers point to that instance.

```javascript
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
      this.value = 0;
    }
    return Singleton.instance;
  }

  instance() {
    
  }
}

// Usage
const singleton1 = new Singleton();
const singleton2 = new Singleton();

console.log(singleton1 === singleton2); // Output will be true, as both instances refer to the same object.
```

## Real world example

For example, we only want a single logger to log the message, ensuring no concurrency caused by multiple logger.

```javascript
class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
      this.logs = [];
    }
    return Logger.instance;
  }

  log(message) {
    this.logs.push({ message, timestamp: new Date() });
    console.log(message);
  }

  displayLogs() {
    this.logs.forEach(log => {
      console.log(`[${log.timestamp}] ${log.message}`);
    });
  }
}

// Usage
const logger1 = new Logger();
logger1.log("Log message 1");

const logger2 = new Logger();
logger2.log("Log message 2");

logger1.displayLogs();
```

## Reference

GPT
