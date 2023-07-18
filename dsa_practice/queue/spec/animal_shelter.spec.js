const AnimalShelter = require('../examples/animal_shelter.js')

describe('AnimalShelter', () => {
  beforeEach(() => {
    testAnimalShelter = new AnimalShelter();
    const values = [
      {id: 'd1', type: 'dog'},
      {id: 'd2', type: 'dog'},
      {id: 'c1', type: 'cat'},
      {id: 'c2', type: 'cat'},
      {id: 'd3', type: 'dog'},
      {id: 'c3', type: 'cat'},
    ];
    for(let i = 0; i < values.length; i++){
      testAnimalShelter.enqueue(values[i]['id'], values[i]['type']);
    }
  });

  test('#enqueue', () => {
    expect(testAnimalShelter.printList()).toEqual(['d1', 'd2', 'c1', 'c2', 'd3', 'c3'])
  });

  test('#dequeueAny', () => {
    testAnimalShelter.dequeueAny()
    expect(testAnimalShelter.printList()).toEqual(['d2', 'c1', 'c2', 'd3', 'c3'])
  })
  
  test('#dequeueCat', () => {
    testAnimalShelter.dequeueCat()
    expect(testAnimalShelter.printList()).toEqual(['d1', 'd2', 'c2', 'd3', 'c3'])
  })

  test('#dequeueDog', () => {
    testAnimalShelter.dequeueDog()
    expect(testAnimalShelter.printList()).toEqual(['d2', 'c1', 'c2', 'd3', 'c3'])
  })
});
