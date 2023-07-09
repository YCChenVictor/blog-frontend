function deleteMiddleNode(linkedList) {
  let fast = linkedList.head;
  let slow = linkedList.head;
  let preNode = null;

  if (!fast || !fast.next) {
    // The linked list has 0 or 1 nodes, no middle node to delete
    return linkedList;
  }

  while (fast && fast.next && fast.next.next) {
    fast = fast.next.next
    preNode = slow
    slow = slow.next
  }
  preNode.next = slow.next;

  return linkedList;
}

module.exports = {
  deleteMiddleNode: deleteMiddleNode
};
