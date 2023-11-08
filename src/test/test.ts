type Person = {
  id: string,
  name: string,
  city: string,
  contact: {phone: number} // 物件
}

type Employee = {
  id: string,
  company: string,
  dept: string
  contact: {name: string} // 物件
}

type EmployedPerson = Person & Employee
let typeTest = typeof ({} as EmployedPerson)['contact']

let person1: EmployedPerson = {
  id: 'wqer', name: 'qwer', city: 'qewr',
  company: 'qwer', dept: 'qwer',
  contact: {name: 'qwer', phone: 111111}
}

console.log(typeTest)
