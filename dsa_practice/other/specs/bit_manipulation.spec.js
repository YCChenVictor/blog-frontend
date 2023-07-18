const Insertion = require('../examples/bit_manipulation.js')

describe('Insertion', () => {
  test('#', () => {
    expect(Insertion(10000000000, 10011, 2, 6)).toEqual(10001001100)
  })
})
