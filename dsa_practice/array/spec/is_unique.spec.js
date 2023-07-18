const charactersIsUnique = require('../examples/is_unique.js');

describe('Is Unique', () => {
  test('s = example', () => {
    let s = 'example'
    expect(charactersIsUnique(s)).toEqual(false)
  })
  test('s = fast', () => {
    let s = 'fast'
    expect(charactersIsUnique(s)).toEqual(true)
  })
})
