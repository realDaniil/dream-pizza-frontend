import { Button, Card, CircularProgress, IconButton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MyImage from '../../UI/MyImage'
import cl from './BaskedCard.module.scss'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import { addItem, decreaseItem, removeItem, removeTotalCount } from '../../../store/slices/basketSlice'
import { useDispatch } from 'react-redux'

const BaskedCard = ({ name, price, itemId, imageUrl, totalCount }) => {
  
  const [seconds, setSeconds] = useState(5)
  const [timerActive, setTimerActive] = useState(false)
  
  const dispatch = useDispatch()
  const addProduct = () => {
    dispatch(addItem({ itemId }))
  }

  const reduceTotalCount = () => {
    dispatch(decreaseItem({ itemId }))
  }

  const removeTotalCountItem = () => {
    dispatch(removeTotalCount({ itemId }))
  }

  const removeBasketItem = () => {
    dispatch(removeItem(itemId))
  }

  useEffect(() => {
    let intervalId
    if (seconds >= 0 && timerActive) {
      intervalId = setInterval(() => {
        setSeconds(seconds - 1)
      }, 1000)
    } else if (seconds <= 0 && timerActive) {
      setTimerActive(false)
      removeBasketItem()
    } else {
      setTimerActive(false)
    }
    return () => clearInterval(intervalId)
  }, [seconds, timerActive])

  useEffect(() => {
    if (totalCount < 1) setTimerActive(true)
  }, [totalCount])

  return (
    <Card elevation={0} className={cl.card}>
      {totalCount >= 1 ?
        <>
          <div className={cl.leftSide}>
            <MyImage style={{ height: '100px' }} src={imageUrl} />
            <p className={cl.name}>{name}</p>
          </div>

          <div className={cl.totalCountHolder}>
            <IconButton onClick={reduceTotalCount} size={'small'} color={'warning'}>
              <RemoveIcon />
            </IconButton>
            {totalCount}
            <IconButton onClick={addProduct} size={'small'} color={'warning'}>
              <AddIcon />
            </IconButton>
          <p>{price * totalCount + 'грн'}</p>
          </div>
          <IconButton onClick={removeTotalCountItem} size={'small'} color={'warning'}>
            <DeleteIcon />
          </IconButton>
        </>
        :
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={cl.progressHolder}>
              <CircularProgress color={'warning'} variant={'determinate'} value={seconds * -20}></CircularProgress>
              <p>{seconds}</p>
            </div>
            <p>Ви видалили "{name}"</p>
          </div>
          <Button color='warning' sx={{m: 2}} onClick={() => {
            addProduct()
            setTimerActive(false)
            setSeconds(5)
          }}>Повернути</Button>
        </>
      }
    </Card>
  )
}

export default BaskedCard