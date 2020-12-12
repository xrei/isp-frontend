import { useStore } from 'effector-react'
import React from 'react'
import { $modal } from './model'
import { AbonentModal } from '../AbonentModal'
import { PlanModal } from '../PlanModal'

export const Modals: React.FC = () => {
  const modal = useStore($modal)
  const modals = {
    abonent: AbonentModal,
    plans: PlanModal,
  }
  const Component = modal && modals[modal]
  return <>{Component && <Component />}</>
}
