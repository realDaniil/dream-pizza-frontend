import { FormControlLabel, IconButton, Modal, Paper, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BasketButton from './button/BasketButton'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import cl from './Basket.module.scss'
import BaskedCard from './card/BaskedCard'
import { orange } from '@mui/material/colors'
import MyButton from '../UI/button/MyButton'
import CloseIcon from '@mui/icons-material/Close';

const radioSx = {
  color: orange[500],
  '&.Mui-checked': {
    color: orange[600],
  },
}

const Basket = () => {
  const [open, setOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [deliveryOptions, setDeliveryOptions] = useState('courier')
  
  const { pathname } = useLocation()
  const basketItems = useSelector(state => state.basket.items)
  const [totalSum, setTotalSum] = useState(0)
  useEffect(() => {
    if (basketItems.length === 0) setOpen(false)
    let totalSum = 0
    basketItems.forEach(item => {
      totalSum += item.price * item.totalCount
    })
    setTotalSum(totalSum)
  }, [basketItems, open])
  if (pathname !== '/') return null
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={cl.holder} onClick={e => setOpen(false)}>
          <Paper sx={{ p: 4 }} className={cl.paper} onClick={e => e.stopPropagation()}>
            <IconButton sx={{float: 'right'}} onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
            {basketItems.map(e =>
              <BaskedCard
                key={e.itemId}
                imageUrl={e.imageUrl}
                size={e.size}
                price={e.price}
                name={e.name}
                itemId={e.itemId}
                totalCount={e.totalCount}
              />
            )}
            <p className={cl.totalPrice}>Сума: {totalSum} грн.</p>
            <TextField sx={{mb:2}} fullWidth label="Ваше ім'я" color='warning' placeholder='Микита' />
            <TextField sx={{mb:2}} fullWidth label="Номер телефону" color='warning' type={'tel'} placeholder='+380 (99) 999-99-99' />
            <p>Варіанти доставки</p>
            <RadioGroup
              value={deliveryOptions}
              onChange={(e) => setDeliveryOptions(e.target.value)}
            >
              <FormControlLabel value="courier" control={<Radio sx={radioSx} />} label="Доставка кур'єром по місту" />
              <FormControlLabel value="pickup" control={<Radio sx={radioSx} />} label="Самовивіз" />
            </RadioGroup>
            <TextField sx={{mb:2}} fullWidth label="Вулиця" color='warning' placeholder='Шевченка' disabled={deliveryOptions === 'pickup'} />
            <TextField sx={{mb:2}} fullWidth label="Будинок" color='warning' placeholder='23а' disabled={deliveryOptions === 'pickup'} />
            <TextField sx={{mb:2}} fullWidth label="Під'їзд" color='warning' placeholder='1' disabled={deliveryOptions === 'pickup'} />
            <TextField sx={{mb:2}} fullWidth label="Номер квартири" color='warning' placeholder='248' disabled={deliveryOptions === 'pickup'} />
            <p>Спосіб оплати</p>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel value="cash" control={<Radio sx={radioSx} />} label="Готівкою при отриманні" />
              <FormControlLabel value="terminal" control={<Radio sx={radioSx} />} label="Оплата терміналом при отриманні" />
            </RadioGroup>
            <TextField sx={{mb:2}} fullWidth label="Коментар до замовлення" color='warning' placeholder='Коментар' />
            <MyButton fullWidth>Оформити замовлення</MyButton>
          </Paper>
        </div>
      </Modal>
      <BasketButton setOpen={setOpen} />
    </>
  )
}

export default Basket