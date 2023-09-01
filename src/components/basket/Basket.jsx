import { Modal, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BasketButton from './button/BasketButton'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import cl from './Basket.module.scss'
import BaskedCard from './card/BaskedCard'


const Basket = () => {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const basketItems = useSelector(state => state.basket.items)
  const [totalSum, setTotalSum] = useState(0)

  useEffect(() => {
    let totalSum = 0
    basketItems.forEach(item => {
      totalSum += item.price * item.totalCount
    })
    setTotalSum(totalSum)
  }, [basketItems])
  if (pathname !== '/') return null
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={cl.holder} onClick={e => setOpen(false)}>
          <Paper sx={{ p: 4 }} className={cl.paper} onClick={e => e.stopPropagation()}>
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
            {totalSum}
          </Paper>
        </div>
      </Modal>
      <BasketButton setOpen={setOpen} />
    </>
  )
}

export default Basket