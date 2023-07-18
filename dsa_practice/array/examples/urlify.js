function URLify(string, length) {
  result = ''
  index = 0
  while (length > 0) {
    if (string[index] === ' ') {
      result += '%20'
    } else {
      result += string[index]
    }
    length -= 1
    index += 1
  }
  return result
}

module.exports = URLify;
  
  