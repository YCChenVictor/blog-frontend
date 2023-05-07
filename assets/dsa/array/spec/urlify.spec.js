const URLify = require('../examples/urlify.js');

describe('URLify', () => {
  test('example: "Mr John Smith    "', () => {
    expect(URLify("Mr John Smith    ", 13)).toEqual("Mr%20John%20Smith")
  })
})
