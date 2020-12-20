import { createStore, createEffect, createEvent, forward } from 'effector'
import { api } from 'src/api'
import { showAlert } from 'src/ui/ErrorAlert/model'

export type Plan = {
  name: string
  price: number
  id: number
  activeUsers?: number
}

type PlanBody = Omit<Plan, 'id'>

export const $plans = createStore<Plan[]>([])
export const $plan = createStore<Plan | null>(null)

export const $planModal = createStore(false)
export const editPlan = createEvent<Plan>()
export const createPlan = createEvent()
export const cancelEditPlan = createEvent()

$planModal.on(editPlan, () => true)
$planModal.on(createPlan, () => true)
$planModal.on(cancelEditPlan, () => false)

$plan.on(editPlan, (_, plan) => plan)

export const getPlansFx = createEffect<void, Plan[]>()
getPlansFx.use(async () => {
  const data = await api.plans.getList()
  console.log(data)
  return data
})

$plans.on(getPlansFx.doneData, (state, payload) => payload)

export const deletePlanFx = createEffect<number, number, Error>()
deletePlanFx.use(async (id) => {
  try {
    const res = await api.plans.delete(id)
    console.log(res)
    return id
  } catch (err) {
    console.log(err)
    showAlert({ show: true, message: err.message, type: 'error' })
    throw err
  }
})

$plans.on(deletePlanFx.doneData, (state, id) =>
  state.filter((p) => p.id !== id),
)

export const editPlanFx = createEffect<Plan, Plan>()
editPlanFx.use(async (plan) => {
  const params = {
    id: plan.id,
    name: plan.name,
    price: Number(plan.price),
  }
  const res = await api.plans.edit(plan.id, params)
  console.log(res)
  return plan
})

$plans.on(editPlanFx.doneData, (state, p) =>
  state.map((plan) => (plan.id === p.id ? p : plan)),
)

export const addPlanFx = createEffect<PlanBody, Plan>()
addPlanFx.use(async (params) => {
  const res = await api.plans.add(params)
  console.log(res)
  if (res.error) throw Error(res.error)

  return res
})

$plans.on(addPlanFx.doneData, (state, plan) => [...state, plan])
$plan.reset([editPlanFx.done, cancelEditPlan])
$planModal.reset([editPlanFx.done, cancelEditPlan, addPlanFx.done])
