import React, { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { getAllEquipmentItemsFx, $equipments } from './model'

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

  const items = useStore($equipments)
  const isLoading = useStore(getAllEquipmentItemsFx.pending)
  const classes = useStyles()

  console.log(isLoading)

  return (
    <Grid container spacing={3}>
      {isLoading ? (
        <Grid item sm={12}>
          <CircularProgress></CircularProgress>
        </Grid>
      ) : (
        items.map((v) => {
          return (
            <Grid key={v.id} item md>
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
                  <Button size="small" color="primary">
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })
      )}
    </Grid>
  )
}
