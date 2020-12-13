import React from 'react'
import { Container, CssBaseline, makeStyles } from '@material-ui/core'
import { AppBar } from './AppBar'
import { SideMenu } from './SideMenu'

type Props = {
  children: NonNullable<React.ReactNode>
  title: string
}

export const MainLayout: React.FC<Props> = ({ children, title }) => {
  const c = useStyles()
  return (
    <div className={c.Layout}>
      <CssBaseline />
      <AppBar title={title} />
      <SideMenu />
      <main className={c.Content}>
        <Container className={c.ContentWrap} maxWidth="lg">
          {children}
        </Container>
      </main>
    </div>
  )
}

const useStyles = makeStyles({
  Layout: {
    display: 'flex',
    position: 'relative',
  },
  Content: {
    display: 'flex',
    flexGrow: 1,
    minHeight: '100vh',
  },
  ContentWrap: {
    marginTop: 64,
    padding: 12,
    ['@media (max-width: 600px)']: {
      marginTop: 56,
    },
  },
})
