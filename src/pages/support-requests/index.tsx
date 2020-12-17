import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogProps,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import {
  getSupportRequestsFx,
  $answerDialog,
  $supRequests,
  toggleDialog,
  editRequest,
  SupportRequest,
  updateSupportRequestFx,
  $supRequest,
} from 'src/stores/supportRequests'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    answerBtn: {
      backgroundColor: theme.palette.success.light,
    },
    requestCard: {},
  }),
)

export const SupportRequests: React.FC = () => {
  useEffect(() => {
    getSupportRequestsFx()
  }, [])
  const classes = useStyles()
  const req = useStore($supRequests)
  const isOpen = useStore($answerDialog)

  const handleAnswerClick = (payload: SupportRequest) => {
    editRequest(payload)
    toggleDialog(true)
  }

  return (
    <div>
      <Grid container spacing={2}>
        {req.map((x) => {
          return (
            <Grid
              lg={6}
              xs={12}
              key={x.id}
              item
              className={classes.requestCard}
            >
              <Card variant="outlined">
                <CardContent>
                  <Grid container direction="row" justify="space-between">
                    <Typography color="textSecondary" gutterBottom>
                      Request #{x.id}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      From user: {x.user?.name + ' ' + x.user?.lastName}
                    </Typography>
                  </Grid>

                  <Typography variant="h6" gutterBottom>
                    Question: {x.question}
                  </Typography>
                  <Typography>Answer: {x.answer}</Typography>
                </CardContent>
                <CardActions>
                  {!x.isAnswered && (
                    <Button
                      className={classes.answerBtn}
                      variant="outlined"
                      onClick={() => handleAnswerClick(x)}
                    >
                      Answer
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {isOpen && <AnswerDialog open={isOpen} />}
    </div>
  )
}

const AnswerDialog: React.FC<DialogProps> = ({ open }) => {
  const [answer, setAnswer] = useState('')
  const supRequest = useStore($supRequest)

  const handleUpdateClick = () => {
    if (!supRequest) return
    const updated = {
      ...supRequest,
      answer,
      isAnswered: true,
    }
    updateSupportRequestFx(updated)
  }

  const handleInputAnswer = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    setAnswer(target.value)
  }

  return (
    <Dialog open={open} onClose={() => toggleDialog(false)}>
      <DialogTitle id="form-dialog-title">Answer question</DialogTitle>
      <DialogContent>
        <TextField
          value={answer}
          autoFocus
          margin="dense"
          label="Answer"
          multiline
          onInput={handleInputAnswer}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleDialog(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => handleUpdateClick()} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}
