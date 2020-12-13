import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import {
  $abonents,
  $abonent,
  getAbonentsFx,
  deleteAbonentFx,
  editAbonentFx,
  editAbonent,
  addAbonentFx,
  createAbonent,
  cancelEditAbonent,
  $abonentModal,
  getPlansFx,
  $plans,
} from 'src/stores/'
import type { Abonent } from 'src/stores'

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from '@material-ui/core'

export const Abonents: React.FC = () => {
  useEffect(() => {
    getAbonentsFx()
    getPlansFx()
  }, [])

  const isEdit = useStore($abonentModal)

  const handleOpenEdit = (abonent: Abonent) => {
    editAbonent(abonent)
  }

  const abonents = useStore($abonents)

  return (
    <div>
      <Typography gutterBottom variant="h3">
        Abonents
      </Typography>

      <Box marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => createAbonent()}
        >
          Create new Abonent
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {abonents.map((abon) => (
              <TableRow key={abon.name}>
                <TableCell>{abon.id}</TableCell>
                <TableCell>{abon.name}</TableCell>
                <TableCell>{abon.lastName}</TableCell>
                <TableCell>{abon.planId}</TableCell>
                <TableCell align="right">
                  <Button
                    style={{ marginRight: '12px' }}
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenEdit(abon)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteAbonentFx(abon.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isEdit && <EditAbonentDialog></EditAbonentDialog>}
    </div>
  )
}

const EditAbonentDialog: React.FC = () => {
  const isOpen = useStore($abonentModal)
  const abonent = useStore($abonent)
  const plans = useStore($plans)
  const defaultPlanId = plans[0].id

  const [state, setState] = React.useState<{
    name: string
    lastName: string
    plan: string
    planId: number
  }>({
    name: '',
    lastName: '',
    planId: defaultPlanId,
    plan: '',
  })

  React.useEffect(() => {
    if (isOpen && abonent) {
      setState({
        name: abonent.name,
        lastName: abonent.lastName,
        planId: abonent.planId,
        plan: abonent.plan,
      })
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const { name, value } = e.target as any
    setState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleEdit = () => {
    console.log(state)
    if (state.name && state.lastName && state.planId) {
      if (abonent) {
        editAbonentFx({ id: abonent.id, ...state })
      } else {
        addAbonentFx(state)
      }
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={() => cancelEditAbonent()}>
        <DialogTitle id="form-dialog-title">
          {abonent ? 'Edit Abonent' : 'Create Abonent'}
        </DialogTitle>
        <DialogContent>
          <TextField
            value={state.name}
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={state.lastName}
            margin="dense"
            label="Last name"
            fullWidth
            name="lastName"
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="planId">Select Plan</InputLabel>
            <Select
              label="Select Plan"
              placeholder="Select"
              displayEmpty
              name="planId"
              value={state.planId}
              onChange={handleChange}
            >
              {plans.map((plan) => {
                return (
                  <MenuItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => cancelEditAbonent()} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleEdit()} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
