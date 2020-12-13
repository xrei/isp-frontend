import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
} from '@material-ui/core'
import {
  People as PeopleIcon,
  Home as HomeIcn,
  Note as NoteIcon,
} from '@material-ui/icons'
import { onClose as ToggleDrawer } from './model'
import { appRoutes } from 'src/routes'

const DrawerWidth = 250

export const MenuList: React.FC = () => {
  const classess = styles()
  return (
    <div className={classess.list} onClick={() => ToggleDrawer()}>
      <List>
        {appRoutes.map((v, i) => (
          <ListItem
            button
            component={Link}
            activeClassName={classess.active}
            exact
            key={i}
            to={v.path}
            onClick={() => ToggleDrawer()}
          >
            <ListItemIcon>
              <HomeIcn></HomeIcn>
            </ListItemIcon>
            <ListItemText>{v.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

const styles = makeStyles((t: Theme) => ({
  list: {
    width: DrawerWidth,
  },
  active: {
    color: t.palette.secondary.main,
  },
}))
