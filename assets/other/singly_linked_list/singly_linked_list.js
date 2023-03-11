class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Create
  prepand(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.length++;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.length++;
  }
    
  // Read
  traverseToIndex(index) {
    let currentNode = this.head;

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  printList() {
    const list = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      list.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return list;
  }

  // Update
  insert(index, value) {
    if (index === 0) {
      this.prepend(value);
    } else if (index >= this.length) {
      this.append(value);
    } else {
      const newNode = new Node(value);
      const leader = this.traverseToIndex(index - 1);
      const nextNode = leader.next;

      leader.next = newNode;
      newNode.next = nextNode;
      this.length++;
    }
  }

  // Delete    
  remove(index) {
    if (index === 0) {
      this.head = this.head.next;
      this.length--;
    } else {
      const leader = this.traverseToIndex(index - 1);
      const unwantedNode = leader.next;

      leader.next = unwantedNode.next;
      this.length--;
    }
  }
}

module.exports = LinkedList;
