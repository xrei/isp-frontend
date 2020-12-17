import { createEffect, createStore } from 'effector'
import { api } from 'src/api'

export type EquipmentItem = {
  id: number
  title: string
  description: string
  price: number
  count: number
  imageUrl: string
}

export const $equipments = createStore<EquipmentItem[]>([])

export const getAllEquipmentItemsFx = createEffect<void, EquipmentItem[]>()
getAllEquipmentItemsFx.use(async () => {
  const res = await api.equipments.getList()
  console.log(res)
  return res
})

$equipments.on(getAllEquipmentItemsFx.doneData, (_, items) => items)
