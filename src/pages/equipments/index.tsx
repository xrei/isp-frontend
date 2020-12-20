import React, { useState, useRef, useEffect } from 'react'
import { useStore } from 'effector-react'
import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import {
  getAllEquipmentItemsFx,
  $equipments,
  $equipmentDialog,
  toggleDialog,
  closeDialog,
  $equipment,
  EquipmentItem,
  addEquipmentFx,
  deleteEquipmentFx,
} from './model'

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      position: 'relative',
      maxWidth: '400px',
      height: '100%',
      display: 'flex',
      flexFlow: 'column',
      ['@media (max-width: 476px)']: {
        maxWidth: '100%',
      },
    },
    media: {
      height: 140,
    },
    actionArea: {
      flex: 1,
    },
  }),
)

export const EquipmentsPage: React.FC = () => {
  useEffect(() => {
    getAllEquipmentItemsFx()
  }, [])
  const isOpen = useStore($equipmentDialog)
  const items = useStore($equipments)
  const isLoading = useStore(getAllEquipmentItemsFx.pending)
  const classes = useStyles()

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => toggleDialog()}
          >
            Add new equipment
          </Button>
        </Grid>
        {isLoading ? (
          <Grid item sm={12}>
            <CircularProgress></CircularProgress>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {items.map((v) => {
              return (
                <Grid key={v.id} item xs={12} md={4}>
                  <Card className={classes.card} elevation={3}>
                    <CardActionArea className={classes.actionArea}>
                      <CardMedia image={v.imageUrl} className={classes.media} />

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {v.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {v.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => deleteEquipmentFx(v.id)}
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      {isOpen && <EditEquipmentDialog />}
    </>
  )
}

const EditEquipmentDialog: React.FC = () => {
  const isOpen = useStore($equipmentDialog)
  const plan = useStore($equipment)
  const form: React.RefObject<HTMLFormElement> = useRef(null)
  const isLoading = useStore(addEquipmentFx.pending)

  const [state, setState] = React.useState<Omit<EquipmentItem, 'id'>>({
    title: '',
    description: '',
    price: 0,
    count: 0,
    imageUrl: '',
  })

  React.useEffect(() => {
    if (isOpen && plan) {
      setState({
        ...plan,
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
    if (form && form.current) {
      const formEl = form.current
      const isValid = formEl.reportValidity()

      if (isValid) {
        addEquipmentFx(state)
      }
    }
  }

  return (
    <Dialog open={isOpen} onClose={() => closeDialog()}>
      <DialogTitle id="form-dialog-title">
        {plan ? 'Edit Equipment' : 'New Equipment'}
      </DialogTitle>
      <DialogContent>
        <Grid component="form" ref={form} container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              value={state.title}
              autoFocus
              margin="dense"
              label="Title"
              name="title"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              value={state.description}
              label="Description"
              name="description"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              value={state.price}
              margin="dense"
              label="Price"
              fullWidth
              name="price"
              type="number"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              value={state.count}
              margin="dense"
              label="Count"
              fullWidth
              name="count"
              type="number"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              value={state.imageUrl}
              label="Image URL"
              name="imageUrl"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => closeDialog()}
          variant="outlined"
          color="secondary"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => handleEdit()}
          variant="outlined"
          color="primary"
        >
          {Boolean(plan) ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
