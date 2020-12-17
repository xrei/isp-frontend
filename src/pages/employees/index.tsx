import React, { useEffect, useState } from 'react'
import { NavLink as Link } from 'react-router-dom'
import { useStore } from 'effector-react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from '@material-ui/core'
import {
  getAllEmployees,
  $employees,
  $hasEmployees,
} from 'src/stores/employees'

export const EmployeesPage: React.FC = () => {
  useEffect(() => {
    getAllEmployees()
  }, [])
  const employees = useStore($employees)
  console.log(employees)
  const hasEmployes = useStore($hasEmployees)

  return (
    <div>
      <Typography gutterBottom variant="h3">
        Company Employees
      </Typography>

      <Box marginBottom={2}>
        <Button
          component={Link}
          to="/employees/create"
          variant="contained"
          color="primary"
          onClick={() => ({})}
        >
          New Employee
        </Button>
      </Box>

      {hasEmployes ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.id}</TableCell>
                  <TableCell>{e.fullName}</TableCell>
                  <TableCell>{e.position}</TableCell>
                  <TableCell>{e.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h5" align="center">
          Currently, no employees
        </Typography>
      )}
    </div>
  )
}
