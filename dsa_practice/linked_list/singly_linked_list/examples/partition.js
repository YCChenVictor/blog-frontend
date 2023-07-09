const LinkedList = require('./singly_linked_list.js');

function partition(linkedlist, value) {
  let node = linkedlist.head
  let leftPartition = []
  let rightPartition = []

  while(node) {
    if (node.value < value) {
      leftPartition.push(node.value)
    } else {
      rightPartition.push(node.value)
    }
    node = node.next
  }

  result = new LinkedList();
  for(let i = 0; i < leftPartition.length; i++) {
    result.append(leftPartition[i])
  }
  for(let i = 0; i < rightPartition.length; i++) {
    result.append(rightPartition[i])
  }

  return result
}

module.exports = {
  partition: partition
};
