import React, { useEffect, useState } from 'react'
import cl from './UpButton.module.scss'
import { IconButton } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const UpButton = () => {
  const [btnClasses, setBtnClasses] = useState([cl.holder]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setBtnClasses([cl.holder, cl.show]);
      } else if (window.scrollY < window.innerHeight) {
        setBtnClasses([cl.holder]);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={btnClasses.join(' ')}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
    >
      <IconButton color={'warning'} className={cl.upBtn} size={'large'}>
        <KeyboardArrowUpIcon />
      </IconButton>
    </div>
  )
}

export default UpButton