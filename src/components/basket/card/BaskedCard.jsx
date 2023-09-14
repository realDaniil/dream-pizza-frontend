import { Button, Card, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MyImage from '../../UI/MyImage'
import cl from './BaskedCard.module.scss'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import { addItem, decreaseItem, removeItem } from '../../../store/slices/basketSlice'
import { useDispatch } from 'react-redux'

const BaskedCard = ({ name, size, price, itemId, imageUrl, totalCount }) => {
  const [count, setCount] = useState(totalCount)
  const [seconds, setSeconds] = useState(5)
  const [timerActive, setTimerActive] = useState(false)
  const [cardClasses, setCardClasses] = useState([cl.card])
  const [productSize, setProductSize] = useState('')
  const dispatch = useDispatch()
  const addProduct = () => {
    dispatch(addItem({ itemId }))
  }

  const reduceTotalCount = () => {
    if (count - 1 < 1) {
      setCount(count - 1)
    } else {
      dispatch(decreaseItem({ itemId }))
      setCount(count - 1)
    }
  }

  const removeTotalCountItem = () => {
    setCount(0)
  }

  const removeBasketItem = () => {
    setCardClasses([cl.card, cl.removed])
    setTimeout(() => {
      dispatch(removeItem(itemId))
    }, 500)
  }

  useEffect(() => {
    let intervalId
    if (seconds >= 1 && timerActive) {
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
    setCount(totalCount)
  }, [totalCount])

  useEffect(() => {
    if (count < 1) setTimerActive(true)
  }, [count])

  useEffect(() => {
    if (size === 'small') {
      setProductSize('M')
    } else if (size === 'medium') {
      setProductSize('L')
    } else if (size === 'large') setProductSize('XL')
  }, [])

  return (
    <Card elevation={0} className={cardClasses.join(' ')}>
      {count >= 1 ?
        <>
          <div className={cl.leftSide}>
            <div className={cl.imgHolder}>
              <MyImage style={{ height: '100px' }} src={imageUrl} />
              {productSize && <div className={cl.sizeHolder}>{productSize}</div>}
            </div>
            <p className={cl.name}>{name}</p>
          </div>
          <div className={cl.rightSide}>
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
          </div>
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
          <Button color='warning' sx={{ m: 2 }} onClick={() => {
            setCount(totalCount)
            setTimerActive(false)
            setSeconds(5)
          }}>Повернути</Button>
        </>
      }
    </Card>
  )
}

export default BaskedCard