import {
  Main,
  Abonents,
  Plans,
  SupportRequests,
  EmployeesPage,
  CreateEmployeePage,
  EquipmentsPage,
} from './pages'
import { createBrowserHistory } from 'history'

type Routes = {
  [key: string]: {
    path: string
    title: string
    view: React.FC
    childs?: any[]
  }
}

export const Routes: Routes = {
  root: {
    path: '/',
    title: 'Main',
    view: Main,
  },
  abonents: {
    path: '/abonents',
    title: 'Abonents',
    view: Abonents,
  },
  plans: { path: '/plans', title: 'Plans', view: Plans },
  supportRequests: {
    path: '/support-requests',
    title: 'Abonents Requests',
    view: SupportRequests,
  },
  employees: {
    path: '/employees',
    title: 'Employees',
    view: EmployeesPage,
  },
  employeesCreate: {
    path: '/employees/create',
    title: 'Register Employee',
    view: CreateEmployeePage,
  },
  equipments: {
    path: '/equipments',
    title: 'Equipments',
    view: EquipmentsPage,
  },
}

export const appRoutes = Object.values(Routes)
export const history = createBrowserHistory()

export default Routes
