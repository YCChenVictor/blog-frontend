const { sumList } = require('../examples/sum_list.js')
const LinkedList = require('../examples/singly_linked_list.js')

describe('sum list', () => {
  const linkedListA = new LinkedList()
  const linkedListB = new LinkedList()
  beforeEach(() => {
    const numberOfA = [6, 1, 7] // 6 is head
    const numberOfB = [5, 9, 2] // 2 is head
    for(let i = 0 ;i < numberOfA.length; i++) {
      linkedListA.append(numberOfA[i])
    }
    for(let i = 0 ;i < numberOfB.length; i++) {
      linkedListB.append(numberOfB[i])
    }
  })
  test('return desired linked list', () => {
    expect(sumList(linkedListA, linkedListB).printList()).toEqual([1, 2, 0, 9])
  })
})
