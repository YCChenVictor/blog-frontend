checkPermutation = require('../examples/check_permutation.js')

describe('checkPermutation', () => {
  test('s1 = wqer, s2 = rewq', () => {
    expect(checkPermutation('wqer', 'rewq')).toEqual(true)
  })

  test('s1 = asfd, s2 = rewq', () => {
    expect(checkPermutation('asdf', 'rewq')).toEqual(false)
  })
})
