import React from 'react'
import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'

export const Main: React.FC = () => {
  return (
    <div className="main">
      <h1>Internet service provider admin app</h1>
      <Typography>Navigation:</Typography>
      <Grid container>
        <Grid item>
          <Card to="/abonents">Abonents</Card>
        </Grid>
        <Grid item>
          <Card to="/plans">Plans</Card>
        </Grid>
        <Grid item>
          <Card to="/support-requests">Support requests</Card>
        </Grid>
        <Grid item>
          <Card to="/equipments">Equipments</Card>
        </Grid>
        <Grid item>
          <Card to="/employees">Employees</Card>
        </Grid>
      </Grid>
    </div>
  )
}

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
