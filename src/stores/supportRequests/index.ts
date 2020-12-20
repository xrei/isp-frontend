import { createStore, createEffect, createEvent } from 'effector'
import { api } from 'src/api'

const isArray = (xs: any[]) => Array.isArray(xs) && xs

export type SupportRequest = {
  id: number
  question: string
  answer?: string
  isAnswered: boolean
  userId: number
  user?: any
}

export const $supRequests = createStore<SupportRequest[]>([])
export const $answerDialog = createStore(false)
export const $supRequest = createStore<SupportRequest | null>(null)

export const toggleDialog = createEvent<true | false>()
export const editRequest = createEvent<SupportRequest>()

$answerDialog.on(toggleDialog, (_, payload) => payload)
$supRequest.on(editRequest, (_, payload) => payload)

export const getSupportRequestsFx = createEffect<void, SupportRequest[]>()
getSupportRequestsFx.use(async () => {
  try {
    const data = await api.supportRequests.getList()
    console.log(data)
    return isArray(data) || []
  } catch (err) {
    console.log(err)
    throw err
  }
})

$supRequests.on(getSupportRequestsFx.doneData, (_, data) => data)

export const updateSupportRequestFx = createEffect<
  SupportRequest,
  SupportRequest
>()
updateSupportRequestFx.use(async (payload) => {
  console.log(payload)
  const data = await api.supportRequests.edit(payload.id, payload)
  console.log(data)
  return payload
})

$supRequests.on(updateSupportRequestFx.doneData, (state, newData) =>
  state.map((x) => (newData.id !== x.id ? x : newData)),
)

$answerDialog.on(updateSupportRequestFx.done, () => false)
