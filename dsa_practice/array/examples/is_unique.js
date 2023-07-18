function charactersIsUnique(s) {
  object = {}
  if(typeof s != 'string') {
    return 'wrong type'
  }
  for (var i = 0; i < s.length; i++) {
    if(object.hasOwnProperty(s[i])) {
      return false
    } else {
      object[s[i]] = 1
    }
  }
  return true
}

module.exports = charactersIsUnique;

