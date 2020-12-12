import React from 'react'
import styled from 'styled-components'

type ModalProps = {
  close?: Function
}

export const AbstractModal: React.FC<ModalProps> = ({ children, close }) => {
  const onClose: React.MouseEventHandler = (event) => {
    event.preventDefault()
    if (event.target === event.currentTarget) {
      close && close()
    }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer>{children}</ModalContainer>
    </ModalOverlay>
  )
}

const ModalContainer = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  padding: 16px;
  display: flex;
  flex-flow: column;
  z-index: 1100;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`
