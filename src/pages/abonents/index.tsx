import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { Table, TableBody, TableCell, TableHead, TableRow } from 'src/ui/Table'
import {
  $abonents,
  getAbonentsFx,
  deleteAbonentFx,
  editAbonent,
} from 'src/stores/'
import { Button } from 'src/ui/Button'
import { openModal } from 'src/ui/Modals'

export const Abonents: React.FC = () => {
  useEffect(() => {
    getAbonentsFx()
  }, [])

  const abonents = useStore($abonents)

  return (
    <div>
      <h1>Abonents</h1>
      <AddAbonent color="secondary" onClick={() => openModal('abonent')}>
        Add abonent
      </AddAbonent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell comp="th">ID</TableCell>
            <TableCell comp="th">First name</TableCell>
            <TableCell comp="th">Last name</TableCell>
            <TableCell comp="th">Plan</TableCell>
            <TableCell comp="th"></TableCell>
            <TableCell comp="th"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {abonents.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.plan}</TableCell>
              <TableCell>
                <Button onClick={() => editAbonent(row)}>Edit</Button>
              </TableCell>
              <TableCell>
                <Button color="error" onClick={() => deleteAbonentFx(row.id)}>
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

const AddAbonent = styled(Button)`
  margin: 16px 0;
  color: #fff;
`
