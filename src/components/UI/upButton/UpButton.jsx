import React, { useEffect, useState } from 'react'
import cl from './UpButton.module.scss'
import { IconButton } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const UpButton = () => {
  const [visible, setVisible] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset)
  const btnStyles = [cl.upBtnHolder]
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  if (window.innerHeight <= scrollPosition && visible !== true) {
    setVisible(true)
  } else if (window.innerHeight > scrollPosition && visible !== false) {
    setVisible(false)
  }

  if (visible) btnStyles.push(cl.visible)
  return (
    <div
      // style={{ bottom: anchorPosition }}
      className={btnStyles.join(' ')}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
    >
      <IconButton className={cl.upBtn} size={'large'}>
        <KeyboardArrowUpIcon />
      </IconButton>
    </div>
  )
}

export default UpButton