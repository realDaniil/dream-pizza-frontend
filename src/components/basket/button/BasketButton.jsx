import React, { useEffect, useState } from 'react'
import { Badge, IconButton, Tooltip } from '@mui/material'
import { BsFillBasket2Fill } from 'react-icons/bs'
import cl from './BasketButton.module.scss'
import { useSelector } from 'react-redux'

const BasketButton = ({ setOpen }) => {
  const basketItems = useSelector(state => state.basket.items)
  const basketStyles = [cl.basket]
  const [totalSum, setTotalSum] = useState(0)

  useEffect(() => {
    let totalSum = 0
    basketItems.forEach(item => {
      totalSum += item.price * item.totalCount
    })
    setTotalSum(totalSum)
  }, [basketItems])
  if (basketItems.length !== 0) basketStyles.push(cl.visible)
  return (
    <div className={basketStyles.join(' ')} onClick={() => setOpen(true)}>
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