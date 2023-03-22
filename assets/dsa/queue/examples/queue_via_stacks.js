const Stack = require('../../stack/examples/stack.js')

class QueueViaStacks { // FIFO
  constructor() {
    this.stackOne = new Stack();
    this.stackTwo = new Stack();
  }

  enqueue(element) {
    this.stackOne.push(element);
  }

  dequeue() {
    const length = this.stackOne.items.length

    if (this.stackOne.length == 0) {
      return 'no element'
    }

    for (let i = 0; i < length; i++) {
      this.stackTwo.push(this.stackOne.pop())
    }
    return this.stackTwo.pop()
  }
}

module.exports = QueueViaStacks
