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
  Grid,
  TableSortLabel,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
)

interface SortableAbonentFields extends Omit<Abonent, 'plan'> {}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  id: keyof SortableAbonentFields
  label: string
  numeric: boolean
}
const headCells: HeadCell[] = [
  { id: 'id', numeric: true, label: 'ID' },
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'lastName', numeric: false, label: 'Last Name' },
]

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof SortableAbonentFields,
  ) => void
  order: Order
  orderBy: string
}
const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler = (property: keyof SortableAbonentFields) => (
    event: React.MouseEvent<unknown>,
  ) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Plan</TableCell>
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}

export const Abonents: React.FC = () => {
  const classes = useStyles()
  useEffect(() => {
    getAbonentsFx()
    getPlansFx()
  }, [])

  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof SortableAbonentFields>(
    'id',
  )
  const isEdit = useStore($abonentModal)
  const abonents = useStore($abonents)

  const handleOpenEdit = (abonent: Abonent) => {
    editAbonent(abonent)
  }
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SortableAbonentFields,
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <Grid style={{ height: '100%' }} container>
      <Box p={2} width="100%">
        <Grid item xs={12}>
          <Typography gutterBottom variant="h3">
            Abonents
          </Typography>
        </Grid>

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
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            ></EnhancedTableHead>
            <TableBody>
              {stableSort(abonents, getComparator(order, orderBy)).map(
                (abon) => (
                  <TableRow key={abon.name}>
                    <TableCell>{abon.id}</TableCell>
                    <TableCell>{abon.name}</TableCell>
                    <TableCell>{abon.lastName}</TableCell>
                    <TableCell>{abon.plan?.name}</TableCell>
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
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {isEdit && <EditAbonentDialog></EditAbonentDialog>}
      </Box>
    </Grid>
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
    planId: number
  }>({
    name: '',
    lastName: '',
    planId: defaultPlanId,
  })

  React.useEffect(() => {
    if (isOpen && abonent) {
      setState({
        name: abonent.name,
        lastName: abonent.lastName,
        planId: abonent.planId,
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
