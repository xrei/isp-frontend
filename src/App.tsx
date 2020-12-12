import React from 'react'
import { Route } from 'react-router-dom'
import { appRoutes, history } from './routes'
import { MainLayout } from './ui/Layout/MainLayout'
import { Router } from 'react-router'
import { Modals } from './ui/Modals'

function App() {
  return (
    <Router history={history}>
      <MainLayout>
        {appRoutes.map(({ path, view }, i) => (
          <Route exact key={i} path={path} component={view} />
        ))}
      </MainLayout>
      <Modals></Modals>
    </Router>
  )
}

export default App
