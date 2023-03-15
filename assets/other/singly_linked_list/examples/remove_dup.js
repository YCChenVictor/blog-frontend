function removeDup(linkedList) {
  // skip brute force, we must at least loop through all node, so the time complexity = O(n), space complexity = O(n)
  set = new Set();
  let currentNode = linkedList.head
  let previousNode = null

  for (let i = 0; i < linkedList.length; i++) {
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
