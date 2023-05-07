const Trie = require('../examples/trie.js')

describe('Trie', () => {
  // we can extract all the same code int to before block

  it('should insert a word', () => {
    trie = new Trie()
    trie.insert('apple')
    expect(trie.search('apple')).toEqual(true)
  })
})
