class threeStacksInOneArray { // divide array equally
  constructor(arrayLength) {
    this.elements = new Array(arrayLength).fill(null);
    this.starts = [0, Math.round(arrayLength / 3), Math.round(arrayLength / 3) * 2]
    this.ends = [Math.round(arrayLength / 3) - 1, Math.round(arrayLength / 3) * 2 - 1, arrayLength - 1]
  }

  push(whichStack, value) {
    console.log(`push value to ${whichStack + 1}th stack`)
    if (this.starts[whichStack] == this.ends[whichStack]) {
      return `no more space for ${whichStack + 1}th stack`
    }
    this.elements[this.starts[whichStack]] = value
    this.starts[whichStack] += 1
  }

  pop(whichStack) {
    console.log(`pop value from ${whichStack + 1}th stack`)
    if (this.starts[whichStack] == this.ends[whichStack]) {
      return `no more value to pop in ${whichStack + 1}th stack`
    }
    this.elements[this.starts[whichStack] - 1] = null
    this.starts[whichStack] -= 1
  }

  // other to be continued
}

module.exports = threeStacksInOneArray;
