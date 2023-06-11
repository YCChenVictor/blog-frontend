class StackMin {
  constructor() {
    this.items = [];
    this.minValue = null;
  }
  
  push(element) {
    this.items.push(element);
    if (element < this.minValue || this.minValue === null) {
      this.minValue = element
    }
  }
  
  pop() {
    if (this.items.length === 0) {
      return "Underflow";
    }
    return this.items.pop();
  }

  returnMin() {
    return this.minValue;
  }
}

module.exports = StackMin;
  