import { createEvent, createStore } from 'effector'

type Modal = 'abonent' | 'plans' | ''
export const $modal = createStore<Modal>('')

export const openModal = createEvent<Modal>()
export const closeModal = createEvent()

$modal.on(openModal, (_, modal) => modal)
$modal.on(closeModal, () => '')
