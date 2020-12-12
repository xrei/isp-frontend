import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { AbstractModal, openModal } from 'src/ui/Modals/'
import {
  $abonent,
  $isEditAbonent,
  addAbonentFx,
  editAbonentFx,
} from 'src/stores/'
import { Button } from '../Button'

export const AbonentModal: React.FC = () => {
  const abonent = useStore($abonent)
  const isEdit = useStore($isEditAbonent)
  const [state, setState] = React.useState({ name: '', lastName: '', plan: '' })

  React.useEffect(() => {
    if (isEdit && abonent) {
      setState({
        name: abonent.name,
        lastName: abonent.lastName,
        plan: abonent.plan,
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

  const handleAbonent = () => {
    if (isEdit && abonent) editAbonentFx({ id: abonent.id, ...state })
    else addAbonentFx(state)
  }

  return (
    <AbstractModal close={() => openModal('')}>
      <h1>{isEdit ? 'Edit abonent' : 'Add abonent'}</h1>
      <Input
        value={state.name}
        type="text"
        onChange={handleChange}
        name="name"
        placeholder="Type name"
      />
      <Input
        value={state.lastName}
        type="text"
        name="lastname"
        onChange={handleChange}
        placeholder="Type lastname"
      />
      <Input
        value={state.plan}
        type="text"
        name="plan"
        onChange={handleChange}
        placeholder="Type plan"
      />
      <Button color="primary" onClick={handleAbonent}>
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
