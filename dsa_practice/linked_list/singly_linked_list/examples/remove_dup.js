function removeDup(linkedList) {
  set = new Set();
  let currentNode = linkedList.head
  let previousNode = null

  while (currentNode !== null) {
    if (!set.has(currentNode.value)) {
      set.add(currentNode.value)
    } else {
      previousNode.next = currentNode.next
    }
    previousNode = currentNode
    currentNode = currentNode.next
  }

  return linkedList.printList()
}

module.exports = {
  removeDup: removeDup
};
