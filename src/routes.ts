import { Main, Abonents, Plans } from './pages'
import { createBrowserHistory } from 'history'

type Routes = {
  [key: string]: {
    path: string
    title: string
    view: React.FC
    icon?: any
  }
}

const Routes: Routes = {
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
}

export const appRoutes = Object.values(Routes)
export const history = createBrowserHistory()

export default Routes
