import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { AbstractModal, openModal, closeModal } from 'src/ui/Modals/'
import { $plan, $isEditPlan, addPlanFx, editPlanFx } from 'src/stores/'
import { Button } from '../Button'

export const PlanModal: React.FC = () => {
  const plan = useStore($plan)
  const isEdit = useStore($isEditPlan)
  const [state, setState] = React.useState({ name: '', price: 0 })

  React.useEffect(() => {
    console.log(isEdit, plan)
    if (isEdit && plan) {
      setState({
        name: plan.name,
        price: plan.price,
      })
    }
  }, [])

  const handleChange = (e: React.SyntheticEvent) => {
    const { name, value } = e.target as any
    setState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePlan = () => {
    if (isEdit && plan) editPlanFx({ id: plan.id, ...state })
    else addPlanFx(state)
  }

  return (
    <AbstractModal close={() => closeModal()}>
      <h1>{isEdit ? 'Edit plan' : 'Add plan'}</h1>
      <Input
        value={state.name}
        type="text"
        onChange={handleChange}
        name="name"
        placeholder="Enter plan name"
      />
      <Input
        value={state.price}
        type="number"
        name="price"
        onChange={handleChange}
        placeholder="enter price"
      />
      <Button color="primary" onClick={handlePlan}>
        {isEdit ? 'Edit' : 'Add'}
      </Button>
    </AbstractModal>
  )
}

const Input = styled.input`
  border: 1px solid #212121;
  padding: 12px 10px;
  margin-bottom: 10px;
`
