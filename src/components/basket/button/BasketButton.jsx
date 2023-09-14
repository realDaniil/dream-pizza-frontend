import React, { useEffect, useState } from 'react'
import { Badge, IconButton, Tooltip } from '@mui/material'
import { BsFillBasket2Fill } from 'react-icons/bs'
import cl from './BasketButton.module.scss'
import { useSelector } from 'react-redux'

const BasketButton = ({ setOpen }) => {
  const basketItems = useSelector(state => state.basket.items)
  const [basketClasses, setBasketClasses] = useState([cl.basket])
  const [totalSum, setTotalSum] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(window.scrollY)

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (scrollPosition >= 100 && !basketClasses.includes(cl.topDistance)) {
      setBasketClasses(prevClasses => [...prevClasses, cl.topDistance])
    } else if (scrollPosition < 100) {
      setBasketClasses(prevClasses => prevClasses.filter(e => e !== cl.topDistance))
    }
  }, [scrollPosition])
  
  useEffect(() => {
    let totalSum = 0
    basketItems.forEach(item => {
      totalSum += item.price * item.totalCount
    })
    setTotalSum(totalSum)
    if (basketItems.length !== 0) {
      setBasketClasses([...basketClasses, cl.visible])
    } else setBasketClasses(basketClasses.filter(e => e !== cl.visible))
    }, [basketItems])
  return (
    <div className={basketClasses.join(' ')} onClick={() => setOpen(true)}>
      <Badge sx={{ cursor: 'default' }} color={'warning'} badgeContent={basketItems.length}>
        <Tooltip title={totalSum + 'грн'}>
          <IconButton className={cl.basketBtn} size={'large'}>
            <BsFillBasket2Fill />
          </IconButton>
        </Tooltip>
      </Badge>
    </div>
  )
}

export default BasketButton