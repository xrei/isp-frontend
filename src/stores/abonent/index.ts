import { createStore, createEffect, createEvent, forward } from 'effector'
import { api } from 'src/api'
import type { Plan } from '../plans'

export interface Abonent {
  name: string
  lastName: string
  plan?: Plan
  planId: number
  id: number
}

type AbonentBody = Omit<Abonent, 'id'>

export const $abonents = createStore<Abonent[]>([])
export const $abonent = createStore<Abonent | null>(null)

export const $abonentModal = createStore(false)
export const editAbonent = createEvent<Abonent>()
export const createAbonent = createEvent()
export const cancelEditAbonent = createEvent()

$abonent.on(editAbonent, (_, abonent) => abonent)
$abonentModal.on(editAbonent, () => true)
$abonentModal.on(createAbonent, () => true)
$abonentModal.on(cancelEditAbonent, () => false)

export const getAbonentsFx = createEffect<void, Abonent[]>()
getAbonentsFx.use(async () => {
  const data = await api.users.getList()
  console.log(data)
  return data
})

export const deleteAbonentFx = createEffect<number, number | Error>()
deleteAbonentFx.use(async (id) => {
  try {
    const res = await api.users.delete(id)
    return id
  } catch (err) {
    throw Error(err)
  }
})

export const editAbonentFx = createEffect<Abonent, Abonent>()
editAbonentFx.use(async (abonent) => {
  const res = await api.users.edit(abonent.id, abonent)
  return res as Abonent
})

export const addAbonentFx = createEffect<AbonentBody, Abonent>()
addAbonentFx.use(async (params) => {
  const res = await api.users.add(params)
  if (res.error) throw Error('Some err')

  return res
})

$abonents
  .on(getAbonentsFx.doneData, (state, payload) => payload)
  .on(deleteAbonentFx.done, (state, { result }) =>
    state.filter((abon) => abon.id !== result),
  )
  .on(editAbonentFx.doneData, (state, abonent) =>
    state.map((ab) => (ab.id === abonent.id ? abonent : ab)),
  )
  .on(addAbonentFx.doneData, (state, abonent) => [...state, abonent])

$abonent.reset([editAbonentFx.done, cancelEditAbonent])
$abonentModal.reset([addAbonentFx.done, editAbonentFx.done, cancelEditAbonent])
