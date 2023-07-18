class Node {
  constructor(value, type, next = null) {
    this.value = value;
    this.type = type;
    this.next = next;
  }
}

class AnimalShelter {
  constructor() {
    this.head = null;
  }

  enqueue(value, type) {
    if(this.head === null) {
      this.head = new Node(value, type)
    } else {
      const lastNode = this.traverseToLast()
      lastNode.next = new Node(value, type)
    }
  }

  dequeueAny() {
    this.head = this.head.next
  }

  dequeueDog() {
    let currentNode = this.head
    let preNode

    if(currentNode.type === 'dog') {
      this.head = this.head.next
      return currentNode
    }

    while(currentNode.type !== 'dog') {
      preNode = currentNode
      currentNode = currentNode.next
    }

    preNode.next = currentNode.next

    return currentNode
  }

  dequeueCat() {
    let currentNode = this.head
    let preNode
      
    if(currentNode.type === 'cat') {
      this.head = this.head.next
      return currentNode
    }

    while(currentNode.type !== 'cat') {
      preNode = currentNode
      currentNode = currentNode.next
    }

    preNode.next = currentNode.next

    return currentNode
  }

  dequeueAny() {
    this.head = this.head.next
    return this.head
  }

  printList() {
    const result = []
    let currentNode = this.head

    while(currentNode) {
      result.push(currentNode.value)
      currentNode = currentNode.next
    }

    return result
  }

  traverseToLast() {
    let currentNode = this.head;

    for (let i = 0; i < Infinity; i++) {
      if (currentNode.next !== null) {
        currentNode = currentNode.next;
      } else {
        return currentNode
      }
    }
    return currentNode
  }
}

module.exports = AnimalShelter
