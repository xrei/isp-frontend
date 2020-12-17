import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Divider,
} from '@material-ui/core'
import {
  AccountBox as AccountBoxIcon,
  Home as HomeIcn,
  Note as NoteIcon,
  Accessible as AccessibleIcon,
  Group as GroupIcon,
  Storage as StorageIcon,
} from '@material-ui/icons'
import { onClose as ToggleDrawer } from './model'
import { Routes } from 'src/routes'

const DrawerWidth = 250

export const MenuList: React.FC = () => {
  const classess = styles()
  const {
    root,
    abonents,
    plans,
    supportRequests,
    employees,
    equipments,
  } = Routes

  return (
    <div className={classess.list} onClick={() => ToggleDrawer()}>
      <List>
        <MenuItem route={root}>
          <HomeIcn />
        </MenuItem>
        <Divider></Divider>
        <MenuItem route={abonents}>
          <AccountBoxIcon />
        </MenuItem>
        <MenuItem route={plans}>
          <NoteIcon />
        </MenuItem>
        <MenuItem route={supportRequests}>
          <AccessibleIcon />
        </MenuItem>
        <MenuItem route={employees}>
          <GroupIcon />
        </MenuItem>
        <MenuItem route={equipments}>
          <StorageIcon />
        </MenuItem>
      </List>
    </div>
  )
}

const MenuItem: React.FC<{ route: any }> = ({ route, children }) => {
  const classess = styles()

  return (
    <ListItem
      button
      component={Link}
      activeClassName={classess.active}
      exact
      to={route.path}
      onClick={() => ToggleDrawer()}
    >
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText>{route.title}</ListItemText>
    </ListItem>
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
