import React from 'react'
import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

export const Main: React.FC = () => {
  return (
    <div className="main">
      <h1>Internet service provider admin app</h1>
      <Cards>
        <Card to="/abonents">Abonents</Card>
        <Card to="/plans">Plans</Card>
      </Cards>
    </div>
  )
}

const Cards = styled.div`
  max-width: 500px;
`

const Card = styled(Link)`
  padding: 32px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-right: 16px;
  margin-bottom: 16px;
  width: 200px;
  text-align: center;
  display: block;
  transition-property: color, background-color;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #212121;
    color: #fff;
  }
`
