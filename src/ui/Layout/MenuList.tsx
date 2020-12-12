import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import styled from 'styled-components'
import { appRoutes } from 'src/routes'
import { toggleMenu } from './model'

export const MenuList: React.FC = () => {
  return (
    <Menulist>
      {appRoutes.map((v, i) => (
        <ListItem exact key={i} to={v.path} onClick={() => toggleMenu()}>
          {v.title}
        </ListItem>
      ))}
    </Menulist>
  )
}

const Menulist = styled.div`
  display: flex;
  flex-flow: column;
`

const ListItem = styled(Link)`
  display: flex;
  color: #212121;
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0 0;
  text-decoration: none;

  &::last-child {
    margin-bottom: 0;
  }

  &.active,
  &:hover {
    text-decoration: underline;
    color: #00b0ff;
  }
`
