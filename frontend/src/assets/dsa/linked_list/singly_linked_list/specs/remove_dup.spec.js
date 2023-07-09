const { removeDup } = require('../examples/remove_dup.js');
const LinkedList = require('../examples/singly_linked_list.js');

describe('RemoveDup', () => {
  let testLinkedList;
  beforeEach(() => {
    testLinkedList = new LinkedList();
    const values = [1, 4, 6, 3, 2, 7, 4, 8, 3];
    for(let i = 0; i < values.length; i++){
      testLinkedList.append(values[i]);
    }
  });

  test('#', () => {
    const result = removeDup(testLinkedList)
    expect(result).toEqual([1, 4, 6, 3, 2, 7, 8]);
  });
});
