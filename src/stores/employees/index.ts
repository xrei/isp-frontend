import { createStore, createEffect, createEvent, forward } from 'effector'
import { api } from 'src/api'

export type Employee = {
  id: number
  fullName: string
  position: string
  gender: string
  hireDate: number
}

export type EmployeeBody = Omit<Employee, 'hireDate' | 'id'>

export const $employees = createStore<Employee[]>([])
export const $hasEmployees = $employees.map((s) => s.length)
export const $employee = createStore<Employee | null>(null)

export const editEmployee = createEvent<Employee>()
export const createEmployee = createEvent()

export const getAllEmployees = createEffect<void, Employee[]>()
getAllEmployees.use(async () => {
  try {
    const res = await api.employees.getList()
    return res as Employee[]
  } catch (err) {
    console.log(err)
    throw err
  }
})

export const createEmployeeFx = createEffect<EmployeeBody, Employee>()
createEmployeeFx.use(async (params) => {
  const res = await api.employees.add(params)
  console.log(res)
  return res as Employee
})

$employees.on(getAllEmployees.doneData, (state, payload) => payload)
