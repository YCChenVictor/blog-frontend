class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
class LinkedList {
  // index starts from 0
  // position starts from 1

  constructor() {
    this.head = null;
  }

  // Create
  prepand(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.length++;
  }

  append(value) {
    let tail
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      tail = this.traverseTo('last')
      tail.next = newNode;
    }
  }

  insert(position, value) {
    if (position === 1) {
      this.prepend(value);
    } else if (position >= this.length) {
      this.append(value);
    } else {
      const newNode = new Node(value);
      const leader = this.traverseTo(position - 1);
      const nextNode = leader.next;

      leader.next = newNode;
      newNode.next = nextNode;
      this.length++;
    }
  }
    
  // Read
  traverseTo(index) {
    let currentNode = this.head;
    
    if (index === 'last') {
      index = Infinity
    }

    for (let i = 0; i < index; i++) {
      if (currentNode.next !== null) {
        currentNode = currentNode.next;
      } else {
        return currentNode
      }
    }
    return currentNode
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
  update(position, value) {
    const target = this.traverseTo(position - 1);
    target.value = value
  }

  // Delete    
  remove(position) {
    if (position === 1) {
      this.head = this.head.next;
    } else {
      const unwantedNode = this.traverseTo(position - 1);
      const leader = this.traverseTo(position - 2);

      leader.next = unwantedNode.next;
    }
  }
}

module.exports = LinkedList;
