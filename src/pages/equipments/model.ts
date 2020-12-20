import { createEvent, createEffect, createStore } from 'effector'
import { api } from 'src/api'
import { showAlert } from 'src/ui/ErrorAlert/model'

export type EquipmentItem = {
  id: number
  title: string
  description: string
  price: number
  count: number
  imageUrl: string
}

export const $equipments = createStore<EquipmentItem[]>([])
export const $equipment = createStore<EquipmentItem | null>(null)
export const $equipmentDialog = createStore<boolean>(false)

export const toggleDialog = createEvent<EquipmentItem | void>()
export const closeDialog = createEvent()

$equipment.on(toggleDialog, (state, payload) => payload)
$equipment.reset([closeDialog])
$equipmentDialog.on(toggleDialog, () => true)
$equipmentDialog.reset([closeDialog])

export const getAllEquipmentItemsFx = createEffect<void, EquipmentItem[]>()
getAllEquipmentItemsFx.use(async () => {
  const res = await api.equipments.getList()
  console.log(res)
  return res
})

$equipments.on(getAllEquipmentItemsFx.doneData, (_, items) => items)

export const deleteEquipmentFx = createEffect<number, number>()
deleteEquipmentFx.use(async (id) => {
  try {
    const res = await api.equipments.delete(id)
    showAlert({ message: 'Record successfully removed' })
    return id
  } catch (err) {
    showAlert({ message: 'Something went wrong', type: 'error' })
    throw err
  }
})

$equipments.on(deleteEquipmentFx.doneData, (equipments, id) =>
  equipments.filter((x) => x.id !== id),
)

export const addEquipmentFx = createEffect<
  Omit<EquipmentItem, 'id'>,
  EquipmentItem
>()
addEquipmentFx.use(async (params) => {
  try {
    const res = await api.equipments.add(params)
    showAlert({ message: 'New Equipment successfully added' })
    console.log(res)

    return res
  } catch (err) {
    throw err
  }
})

$equipments.on(addEquipmentFx.doneData, (state, payload) => [...state, payload])
