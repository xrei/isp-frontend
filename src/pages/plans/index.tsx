import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { $plans, deletePlanFx, editPlan, getPlansFx } from 'src/stores'

export const Plans: React.FC = () => {
  useEffect(() => {
    getPlansFx()
  }, [])

  const plans = useStore($plans)

  return (
    <div>
      <h1>Plans</h1>
    </div>
  )
}
