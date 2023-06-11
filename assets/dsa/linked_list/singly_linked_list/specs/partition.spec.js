const { partition } = require('../examples/partition.js');
const LinkedList = require('../examples/singly_linked_list.js');

describe('Partition', () => {
  let testLinkedList;
  beforeEach(() => {
    testLinkedList = new LinkedList();
    const values = [1, 4, 6, 3, 2, 7, 4, 8, 3];
    for(let i = 0; i < values.length; i++){
      testLinkedList.append(values[i]);
    }
  });

  test('#', () => {
    const result = partition(testLinkedList, 5)
    expect(result.printList()).toEqual([1, 4, 3, 2, 4, 3, 6, 7, 8]);
  });
});
