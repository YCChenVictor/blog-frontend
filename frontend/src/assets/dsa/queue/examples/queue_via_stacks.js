const Stack = require('../../stack/examples/stack.js')
  
class QueueViaStacks { // FIFO
  constructor() {
    this.stackOne = new Stack();
    this.stackTwo = new Stack();
    this.length = 0;
  }

  enqueue(element) {
    this.length += 1
    this.stackOne.push(element);
  }

  dequeue() {
    for (let i = 0; i < this.length; i++) {
      this.stackTwo.push(this.stackOne.pop())
    }
    return this.stackTwo.pop()
  }
}

module.exports = QueueViaStacks
