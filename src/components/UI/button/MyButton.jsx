import React from 'react'
import cl from './MyButton.module.scss'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { orange } from '@mui/material/colors'

const ColorButton = styled(Button)(() => ({
  color: 'white',
  backgroundColor: orange[500],
  '&:hover': {
    backgroundColor: orange[700],
  },
}))

const MyButton = ({ children, active = '', ...props }) => {
  const myButtonClasses = [cl.myButton]
  if (active === 'active') myButtonClasses.push(cl.active)
  if (active === 'notActive') myButtonClasses.push(cl.notActive)
  return (
    // <button variant={'contained'} className={myButtonClasses.join(' ')} {...props}>{children}</button>
    <ColorButton {...props} className={myButtonClasses.join(' ')} variant="contained">{children}</ColorButton>
  )
}

export default MyButton