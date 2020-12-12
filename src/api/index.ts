import { createRequest } from './req'

const apiUrl = 'http://localhost:5000/api'

const request = createRequest(apiUrl)

export const api = {
  users: {
    getList: () => request({ url: '/users' }),
    get: (id: number) => request({ url: `/users/${id}` }),
    add: (body: any) => request({ url: '/users', method: 'POST', body }),
    edit: (id: number, body: any) =>
      request({ url: `/users/${id}`, method: 'PUT', body }),
    delete: (id: number) => request({ url: `/users/${id}`, method: 'DELETE' }),
  },
  plans: {
    getList: () => request({ url: '/plans' }),
    get: (id: number) => request({ url: `/plans/${id}` }),
    add: (body: any) => request({ url: '/plans', method: 'POST', body }),
    edit: (id: number, body: any) =>
      request({ url: `/plans/${id}`, method: 'PUT', body }),
    delete: (id: number) => request({ url: `/plans/${id}`, method: 'DELETE' }),
  },
  equipments: {
    getList: () => request({ url: '/equipments' }),
    get: (id: number) => request({ url: `/equipments/${id}` }),
    add: (body: any) => request({ url: '/equipments', method: 'POST', body }),
    edit: (id: number, body: any) =>
      request({ url: `/equipments/${id}`, method: 'PUT', body }),
    delete: (id: number) =>
      request({ url: `/equipments/${id}`, method: 'DELETE' }),
  },
  employees: {
    getList: () => request({ url: '/employees' }),
    get: (id: number) => request({ url: `/employees/${id}` }),
    add: (body: any) => request({ url: '/employees', method: 'POST', body }),
    edit: (id: number, body: any) =>
      request({ url: `/employees/${id}`, method: 'PUT', body }),
    delete: (id: number) =>
      request({ url: `/employees/${id}`, method: 'DELETE' }),
  },
  supportRequests: {
    getList: () => request({ url: '/support-requests' }),
    get: (id: number) => request({ url: `/support-requests/${id}` }),
    add: (body: any) =>
      request({ url: '/support-requests', method: 'POST', body }),
    edit: (id: number, body: any) =>
      request({ url: `/support-requests/${id}`, method: 'PUT', body }),
    delete: (id: number) =>
      request({ url: `/support-requests/${id}`, method: 'DELETE' }),
  },
}
