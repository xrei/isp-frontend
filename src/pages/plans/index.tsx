import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import {
  $planModal,
  $plan,
  $plans,
  createPlan,
  deletePlanFx,
  editPlan,
  getPlansFx,
  editPlanFx,
  addPlanFx,
  cancelEditPlan,
} from 'src/stores/plans'
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
  Box,
} from '@material-ui/core'

export const Plans: React.FC = () => {
  useEffect(() => {
    getPlansFx()
  }, [])
  const isEdit = useStore($planModal)

  const plans = useStore($plans)

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Plans
      </Typography>

      <Box marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => createPlan()}
        >
          Create new Plan
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Active Users</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.id}</TableCell>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.price}</TableCell>
                <TableCell>{plan.activeUsers}</TableCell>
                <TableCell align="right">
                  <Button
                    style={{ marginRight: '12px' }}
                    variant="outlined"
                    color="primary"
                    onClick={() => editPlan(plan)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => deletePlanFx(plan.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isEdit && <EditPlanDialog />}
    </div>
  )
}

const EditPlanDialog: React.FC = () => {
  const isOpen = useStore($planModal)
  const plan = useStore($plan)

  const [state, setState] = React.useState<{
    name: string
    price: number
  }>({
    name: '',
    price: 0,
  })

  React.useEffect(() => {
    if (isOpen && plan) {
      setState({
        name: plan.name,
        price: plan.price,
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
    if (state.name && state.price) {
      if (plan) {
        editPlanFx({ id: plan.id, ...state })
      } else {
        addPlanFx(state)
      }
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={() => cancelEditPlan()}>
        <DialogTitle id="form-dialog-title">
          {plan ? 'Edit Plan' : 'Create Plan'}
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
            value={state.price}
            margin="dense"
            label="Price"
            fullWidth
            name="price"
            type="number"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => cancelEditPlan()} color="secondary">
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
