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

console.log(typeTest)
