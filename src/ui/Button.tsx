import React from 'react'
import styled from 'styled-components'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  color?: 'primary' | 'secondary' | 'error'
}

export const Button: React.FC<ButtonProps> = ({ color, children, ...rest }) => {
  const colors = {
    primary: '#1565C0',
    secondary: '#388E3C',
    error: '#ef5350',
  }

  return (
    <Btn {...rest} color={color && colors[color]}>
      {children}
    </Btn>
  )
}

const Btn = styled.button`
  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  position: relative;
  align-items: center;
  user-select: none;
  border-radius: 0;
  vertical-align: middle;
  -moz-appearance: none;
  justify-content: center;
  text-decoration: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  padding: 6px 16px;
  font-size: 0.875rem;
  min-width: 64px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  text-transform: uppercase;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.87);
  background-color: ${(props) => props.color || '#e0e0e0'};

  &:hover {
    color: #fff;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.4);
  }
`
