class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Create
  prepend(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      let tail = this.traverseTo(this.size() - 1);
      tail.next = newNode;
    }
  }

  insert(index, value) {
    if (index === 0) {
      this.prepend(value);
    } else if (index >= this.size()) {
      this.append(value);
    } else {
      const newNode = new Node(value);
      const leader = this.traverseTo(index - 1);
      const nextNode = leader.next;

      leader.next = newNode;
      newNode.next = nextNode;
    }
  }

  // Read
  traverseTo(index) {
    let currentNode = this.head;

    for (let i = 0; i < index; i++) {
      if (currentNode.next !== null) {
        currentNode = currentNode.next;
      } else {
        break; // Exit loop if end of the list is reached
      }
    }
    return currentNode;
  }

  size() {
    let count = 0;
    let currentNode = this.head;

    while (currentNode !== null) {
      count++;
      currentNode = currentNode.next;
    }

    return count;
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
  update(index, value) {
    if (index < 0 || index >= this.size()) {
      throw new Error('Index out of bounds');
    }

    const target = this.traverseTo(index);
    target.value = value;
  }

  // Delete
  remove(index) {
    if (index < 0 || index >= this.size()) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      this.head = this.head.next;
    } else {
      const leader = this.traverseTo(index - 1);
      const unwantedNode = leader.next;

      leader.next = unwantedNode.next;
    }
  }
}

module.exports = LinkedList;
