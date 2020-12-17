import { useStore } from 'effector-react'
import React, { useState } from 'react'
import {
  Typography,
  TextField,
  Select,
  Button,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { createEmployeeFx } from 'src/stores/employees'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageContainer: {
      height: '100%',
      padding: '32px 0',
    },
    formContainer: {
      maxWidth: '480px',
      padding: '24px',
    },
  }),
)

export const CreateEmployeePage: React.FC = () => {
  const c = useStyles()
  const [state, setState] = useState({
    fullName: '',
    position: '',
    gender: 'None',
  })

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const { name, value } = e.target as any
    setState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateClick = () => {
    if (!state.fullName || !state.position) return
    createEmployeeFx(state)
  }

  const isLoading = useStore(createEmployeeFx.pending)

  return (
    <Grid
      className={c.pageContainer}
      component={Paper}
      elevation={2}
      container
      direction="column"
      alignItems="center"
    >
      <Typography gutterBottom variant="h5">
        Register new Employee
      </Typography>
      <Typography gutterBottom>Enter new employee info:</Typography>

      <Grid className={c.formContainer} container justify="center" spacing={1}>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Full Name"
              value={state.fullName}
              name="fullName"
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Position"
              value={state.position}
              name="position"
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Gender</InputLabel>

              <Select
                name="gender"
                value={state.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="None">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <Button
              size="large"
              color="primary"
              variant="outlined"
              fullWidth
              type="submit"
              disabled={isLoading}
              onClick={handleCreateClick}
            >
              {isLoading ? <CircularProgress size={20} /> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
