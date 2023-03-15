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
    if (this.stackOne.length == 0) {
      return 'no element'
    }

    for (let i = 0; i < this.stackOne.items.length; i++) {
      console.log(this.stackOne.pop())
    //   this.stackTwo.push(this.stackOne.pop())
    }
    // return this.stackTwo.pop()
  }
}

module.exports = QueueViaStacks
