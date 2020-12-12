import { createStore, createEffect, createEvent, forward } from 'effector'
import { openModal, closeModal } from 'src/ui/Modals'
import { api } from 'src/api'

type Abonent = {
  name: string
  lastName: string
  plan: string
  id: number
}

type AbonentBody = Omit<Abonent, 'id'>

export const $abonents = createStore<Abonent[]>([])
export const $abonent = createStore<Abonent | null>(null)

export const $isEditAbonent = createStore(false)
export const editAbonent = createEvent<Abonent>()

editAbonent.watch(() => {
  openModal('abonent')
})

$isEditAbonent.on(editAbonent, () => true)
$abonent.on(editAbonent, (_, abonent) => abonent)

export const getAbonentsFx = createEffect<void, Abonent[]>()
getAbonentsFx.use(async () => {
  const data = await api.users.getList()
  console.log(data)
  return data
})

export const deleteAbonentFx = createEffect<number, number>()
deleteAbonentFx.use(async (id) => {
  const res = await api.users.delete(id)
  console.log(res)
  return id
})

export const editAbonentFx = createEffect<Abonent, Abonent>()
editAbonentFx.use(async (abonent) => {
  const params = {
    name: abonent.name,
    lastName: abonent.lastName,
    plan: abonent.plan,
  }
  const res = await api.users.edit(abonent.id, params)

  closeModal()
  return abonent
})

export const addAbonentFx = createEffect<AbonentBody, Abonent>()
addAbonentFx.use(async (params) => {
  const res = await api.users.add(params)
  console.log(res)
  if (res.error) throw Error('Some err')

  closeModal()
  return res.data
})

$abonents
  .on(getAbonentsFx.doneData, (state, payload) => payload)
  .on(deleteAbonentFx.doneData, (state, id) =>
    state.filter((abon) => abon.id !== id),
  )
  .on(editAbonentFx.doneData, (state, abonent) =>
    state.map((ab) => (ab.id === abonent.id ? abonent : ab)),
  )
  .on(addAbonentFx.doneData, (state, abonent) => [...state, abonent])

$abonent.reset([editAbonentFx.done, closeModal])
$isEditAbonent.reset([editAbonentFx.done, closeModal])
