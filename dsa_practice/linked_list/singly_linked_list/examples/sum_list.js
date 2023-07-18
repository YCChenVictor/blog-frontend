const LinkedList = require('./singly_linked_list.js')

function sumList(A, B) {
  const numberOfA = getNumber(A)
  const numberOfB = getNumber(B)

  let restNumber = numberOfA + numberOfB
  const result = new LinkedList()
  while (restNumber !== 0) {
    result.prepend(restNumber % 10)
    restNumber = Math.floor(restNumber / 10)
  }

  return result

  function getNumber(node) {
    let currentNode = node.head
    let number = 0
    const values = []

    while (currentNode != null) {
      values.unshift(currentNode.value)
      currentNode = currentNode.next
    }

    for(let i = 0; i < values.length; i++) {
      number += values[i] * 10 ** i
    }
    
    return number
  }
}

module.exports = {
  sumList: sumList
}
