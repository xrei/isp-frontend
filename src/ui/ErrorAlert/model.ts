import { createEvent, createStore } from 'effector'

export type AlertStore = {
  show: boolean
  message: string
}

export const $errAlert = createStore({
  show: false,
  message: '',
})

export const showErrorAlert = createEvent<AlertStore>()
export const hideErrorAlert = createEvent()

$errAlert.on(showErrorAlert, (old, newState) => newState)
$errAlert.on(hideErrorAlert, () => ({ show: false, message: '' }))
