class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}
  
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  
  // create
  append(data) { // create a node on the tail
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }
  
  prepend(data) { // create a node on the head
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
  }
  
insert() { // create a node on particular position

}
  
  // read
  value() { // return the value of node in particular position
  }

  values() { // return ordered values
    let current_node = this.head;
    const result = [];
    while (current_node !== null) {
      result.append(current_node.data);
      current_node = current_node.next;
    }
    return result
  }
  
// update
update(position, value) { // update the value on particular position

}
    
  // delete
  remove(position) { // remove the node on particular position
    if (this.head === null) {
      return;
    }
    if (this.head === this.tail && this.head.data === data) {
      this.head = null;
      this.tail = null;
      return;
    }
    if (this.head.data === data) {
      this.head = this.head.next;
      this.head.prev = null;
      return;
    }
    let current_node = this.head.next;
    while (current_node !== null && current_node.data !== data) {
      current_node = current_node.next;
    }
    if (current_node === null) {
      return;
    }
    if (current_node === this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = null;
      return;
    }
    current_node.prev.next = current_node.next;
    current_node.next.prev = current_node.prev;
  }
}

module.exports = DoublyLinkedList
