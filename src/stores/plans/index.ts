import { createStore, createEffect, createEvent, forward } from 'effector'
import { openModal, closeModal } from 'src/ui/Modals'
import { api } from 'src/api'

type Plan = {
  name: string
  price: number
  id: number
}

type PlanBody = Omit<Plan, 'id'>

export const $plans = createStore<Plan[]>([])
export const $plan = createStore<Plan | null>(null)

export const $isEditPlan = createStore(false)
export const editPlan = createEvent<Plan>()

editPlan.watch(() => {
  openModal('plans')
})

$isEditPlan.on(editPlan, () => true)
$plan.on(editPlan, (_, plan) => plan)

export const getPlansFx = createEffect<void, Plan[]>()
getPlansFx.use(async () => {
  const data = await api.plans.getList()
  console.log(data)
  return data
})

$plans.on(getPlansFx.doneData, (state, payload) => payload)

export const deletePlanFx = createEffect<number, number>()
deletePlanFx.use(async (id) => {
  const res = await api.plans.delete(id)
  console.log(res)
  return id
})

$plans.on(deletePlanFx.doneData, (state, id) =>
  state.filter((p) => p.id !== id),
)

export const editPlanFx = createEffect<Plan, Plan>()
editPlanFx.use(async (plan) => {
  const params = {
    name: plan.name,
    price: plan.price,
  }
  const res = await api.plans.edit(plan.id, params)

  closeModal()
  return plan
})

$plans.on(editPlanFx.doneData, (state, p) =>
  state.map((plan) => (plan.id === p.id ? p : plan)),
)

$plan.reset([editPlanFx.done, closeModal])
$isEditPlan.reset([editPlanFx.done, closeModal])

$plan.watch((state) => console.log(state))

export const addPlanFx = createEffect<PlanBody, Plan>()
addPlanFx.use(async (params) => {
  const res = await api.plans.add(params)
  console.log(res)
  if (res.error) throw Error(res.error)

  closeModal()
  return res.data
})

$plans.on(addPlanFx.doneData, (state, plan) => [...state, plan])
