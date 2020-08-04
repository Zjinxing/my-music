import React from 'react'
import './index.scss'

interface ButtonProps {
  type?: 'primary' | ''
  className?: string
  ghost?: boolean
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <button className={` ${props.type || ''} ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
