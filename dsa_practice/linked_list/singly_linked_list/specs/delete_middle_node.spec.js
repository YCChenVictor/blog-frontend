const { deleteMiddleNode } = require('../examples/delete_middle_node.js');
const LinkedList = require('../examples/singly_linked_list.js');

describe('deleteMiddleNode', () => {
  let testLinkedList;

  test('odd', () => {
    testLinkedList = new LinkedList();
    const values = [1, 4, 6, 3, 2, 7, 4, 8, 3];
    for(let i = 0; i < values.length; i++){
      testLinkedList.prepand(values[i]); // 3 <- 8 <- 4 <- 7 <- 2 <- 3 <- 6 <- 4 <- 1
    }
    const result = deleteMiddleNode(testLinkedList)
    expect(result.printList()).toEqual([3, 8, 4, 7, 3, 6, 4, 1]);
  });

  test.only('even', () => {
    testLinkedList = new LinkedList();
    const values = [1, 4, 6, 3, 2, 7, 4, 8]; // 8 <- 4 <- 7 <- 2 <- 3 <- 6 <- 4 <- 1
    for(let i = 0; i < values.length; i++){
      testLinkedList.prepand(values[i]);
    }
    const result = deleteMiddleNode(testLinkedList)
    expect(result.printList()).toEqual([8, 4, 7, 3, 6, 4, 1]);
  });
});
