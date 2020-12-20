import { createEvent, createStore } from 'effector'

type Alert = {
  show?: boolean
  message: string
  type?: 'success' | 'error'
}

export const $errAlert = createStore<Alert>({
  show: false,
  message: '',
  type: 'success',
})

export const showAlert = createEvent<Alert>()
export const hideAlert = createEvent()

$errAlert.on(showAlert, (old, newState) => ({
  show: true,
  type: 'success',
  ...newState,
}))
$errAlert.reset(hideAlert)
