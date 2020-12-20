import React from 'react'
import { useStore } from 'effector-react'
import { Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { $errAlert, hideErrorAlert } from './model'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const AppAlert = () => {
  const errAlert = useStore($errAlert)
  const open = errAlert.show
  const msg = errAlert.message

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => hideErrorAlert()}
    >
      <Alert severity="error">{msg}</Alert>
    </Snackbar>
  )
}
