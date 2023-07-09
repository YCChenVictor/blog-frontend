const SinglyLinkedList = require('../examples/singly_linked_list.js');

describe('SinglyLinkedList', () => {
  let testLinkedList;
  beforeEach(() => {
    testLinkedList = new SinglyLinkedList();
    const values = [1, 74, 888, 62, 33];
    for(let i = 0; i < values.length; i++){
      testLinkedList.prepend(values[i]);
    }
  });

  test('#prepend', () => {
    testLinkedList.prepend(0);
    expect(testLinkedList.printList()).toEqual([ 0, 33, 62, 888, 74, 1 ]);
  });

  test('#append', () => {
    testLinkedList.append(0);
    expect(testLinkedList.printList()).toEqual([ 33, 62, 888, 74, 1, 0 ]);
  });

  test('#insert', () => {
    testLinkedList.insert(2, 1000);
    expect(testLinkedList.printList()).toEqual([ 33, 62, 1000, 888, 74, 1 ]);
  });

  test('#traverse', () => {
    expect(testLinkedList.traverseTo(2).value).toEqual(888);
  })

  test('#printList', () => {
    expect(testLinkedList.printList()).toEqual([33, 62, 888, 74, 1]);
  })
  
  test('#update', () => {
    testLinkedList.update(3, 4)
    expect(testLinkedList.printList()).toEqual([33, 62, 888, 4, 1]);
  })
  
  test('#remove', () => {
    testLinkedList.remove(3)
    expect(testLinkedList.printList()).toEqual([33, 62, 888, 1]);
  })
});