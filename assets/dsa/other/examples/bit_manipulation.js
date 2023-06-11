function Insertion (N, M, i, j) {
  N_string = N.toString();
  M_string = M.toString();
  let result = ''
  for (let s = 0; s < (N_string.length - j - 1); s++) {
    result += N_string[s]
  }
  result += M_string
  for (let s = N_string.length - i; s < N_string.length; s++) {
    result += N_string[s]
  }
  return parseInt(result)
}

module.exports = Insertion
