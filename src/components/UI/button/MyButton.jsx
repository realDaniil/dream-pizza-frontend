import React from 'react'
import cl from './MyButton.module.scss'
import { Button } from '@mui/material'

const MyButton = ({ children, variant = '', ...props }) => {
  const myButtonClasses = [cl.myButton]
  if (variant === 'active') myButtonClasses.push(cl.active)
  if (variant === 'notActive') myButtonClasses.push(cl.notActive)
  return (
    <button variant={'contained'} className={myButtonClasses.join(' ')} {...props}>{children}</button>
  )
}

export default MyButton