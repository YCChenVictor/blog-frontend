class threeStacksInOneArray {
  // divide array equally
  // all start from 1, whichStack and position
  constructor(arrayLength) {
    this.elements = new Array(arrayLength).fill(null);
    this.starts = [0, Math.round(arrayLength / 3), Math.round(arrayLength / 3) * 2]
    this.ends = [Math.round(arrayLength / 3) - 1, Math.round(arrayLength / 3) * 2 - 1, arrayLength - 1]
    this.addAts = [0, Math.round(arrayLength / 3), Math.round(arrayLength / 3) * 2]
  }

  push(whichStack, value) {
    if (this.addAts[whichStack] == this.ends[whichStack]) {
      return `no more space for ${whichStack + 1}th stack`
    }
    this.elements[this.addAts[whichStack]] = value
    this.addAts[whichStack] += 1
  }

  pop(whichStack) {
    if (this.addAts[whichStack] == this.ends[whichStack]) {
      return `no more value to pop in ${whichStack + 1}th stack`
    }
    this.elements[this.addAts[whichStack] - 1] = null
    this.addAts[whichStack] -= 1
  }

  peek(whichStack) {
    return this.elements[this.addAts[whichStack - 1] - 1]
  }

  isEmpty(whichStack) {
    const start = this.starts[whichStack - 1]
    const end = this.ends[whichStack - 1]
    const subStack = []

    for (let i = start; i < end; i++) {
      subStack.push(this.elements[i]);
    }

    return subStack.every(element => { return element === null; })
  }

  size(whichStack) {
    const start = this.starts[whichStack - 1]
    const end = this.ends[whichStack - 1]
    let result = 0

    for (let i = start; i < end; i++) {
      if (this.elements[i] !== null) {
        result += 1
      }
    }

    return result
  }
  
  print(whichStack) {
    const start = this.starts[whichStack - 1]
    const end = this.ends[whichStack - 1]
    const subStack = []

    for (let i = start; i <= end; i++) {
      subStack.push(this.elements[i]);
    }

    return subStack
  }
}

module.exports = threeStacksInOneArray;
