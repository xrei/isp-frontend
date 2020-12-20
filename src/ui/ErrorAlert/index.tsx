import React from 'react'
import { useStore } from 'effector-react'
import { Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { $errAlert, hideAlert } from './model'

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
      onClose={() => hideAlert()}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={errAlert.type}>{msg}</Alert>
    </Snackbar>
  )
}
