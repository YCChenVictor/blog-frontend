class Person {
  constructor(
    public id: string,
    public name: string,
    public city: string
  ) {

  }
}

class Employee extends Person {
  constructor(
    public readonly id: string, // 覆寫父層
    public name: string,
    private dept: string,
    public city: string
  ) {
    // super(id, name, city) // 呼叫父層建構子
  }

  writeDept() {
    console.log(`${this.name} works in ${this.dept}`)
  }
}

let data = [
  new Person('a', 'b', 'c'),
  new Employee('d', 'e', 'f', 'g')
]

data.forEach(item => {
  console.log(`Person: ${item.name}, ${item.city}`)
  if(item instanceof Employee) {
    item.writeDept();
  }
})
