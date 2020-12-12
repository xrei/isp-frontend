import React, {useEffect} from 'react'
import {useStore}from 'effector-react'
import styled from 'styled-components'
import { Table, TableBody, TableCell, TableHead, TableRow } from 'src/ui/Table'
import { Button } from 'src/ui/Button'
import { openModal } from 'src/ui/Modals'
import {$plans, deletePlanFx, editPlan, getPlansFx}from 'src/stores'

export const Plans: React.FC = () => {
  useEffect(() => {
    getPlansFx()
  }, [])

  const plans = useStore($plans)

  return (
    <div>
      <h1>Plans</h1>
      <AddPlan color="secondary" onClick={() => openModal('plans')}>
        Add plan
      </AddPlan>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell comp="th">ID</TableCell>
            <TableCell comp="th">Name</TableCell>
            <TableCell comp="th">Price</TableCell>
            <TableCell comp="th"></TableCell>
            <TableCell comp="th"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plans.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>
                <Button onClick={() => editPlan(row)}>Edit</Button>
              </TableCell>
              <TableCell>
                <Button color="error" onClick={() => deletePlanFx(row.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const AddPlan = styled(Button)`
  margin: 16px 0;
  color: #fff;
`
