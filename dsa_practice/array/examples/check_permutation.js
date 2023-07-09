function checkPermutation(string1, string2) {
  const hash_table = {}
  for (let i = 0; i < string1.length; i++) {
    if(hash_table[string1[i]] = null) {
      hash_table[string1[i]] = 1
    } else {
      hash_table[string1[i]] += 1
    }
  }
  for (let i = 0; i < string2.length; i++) {
    hash_table[string2[i]] -= 1
  }
  return Object.values(hash_table).every(element => element === 0)
}

module.exports = checkPermutation
