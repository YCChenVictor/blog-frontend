function returnKthToLast (linkedList, k) {
  let counter = 1; // The first element is 1th
  let node = linkedList.head;
  while (node) {
    if (counter === k) {
      return node;
    }
    counter++;
    node = node.next;
  }
  return null;
}

module.exports = {
  returnKthToLast: returnKthToLast
};
