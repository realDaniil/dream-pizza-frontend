import { CircularProgress } from '@mui/material'
import React from 'react'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0
}

const MyLoader = () => {
  return (
    <div style={style}><CircularProgress /></div>
  )
}

export default MyLoader