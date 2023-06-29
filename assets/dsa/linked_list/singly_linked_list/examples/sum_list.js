function sumList(A, B) {
  numberOfA = getNumber(A)
  numberOfB = getNumber(B)

  totalNumber = numberOfA + numberOfB
  base = 10
  result = new LinkedList()
  while (totalNumber % base !== totalNumber) {
    result.append(totalNumber % base)
    base = base * 10
  }

  return total

  function getNumber(node) {
    number = 0
    currentNode = node.head
    base = 1

    while (currentNode != null) {
      number += currentNode.value * base
      currentNode = currentNode.next
      base = base * 10
    }
    
    return number
  }
}
