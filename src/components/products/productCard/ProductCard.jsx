import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import ElementDeleteModal from '../../UI/ElementDeleteModal'
import EditAndRemoveMenu from '../../UI/EditAndRemoveMenu'
import { EDIT_PRODUCT_ROUTE } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../../store/slices/userSlice'
import cl from './ProductCard.module.scss'
import MyButton from '../../UI/button/MyButton'
import MyImage from '../../UI/MyImage'
import { addItem } from '../../../store/slices/basketSlice'

const ProductCard = ({ name, prices, ingredients, imageUrl, type, id, previewMode = false }) => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.user?.userData)
  const basketItems = useSelector(state => state.basket.items)

  const isOnePrice = (typeof prices !== 'undefined' && prices[0]?.size === 'any')
  const [selectPrice, setSelectPrice] = useState(isOnePrice ? 'any' : 'small')

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  const isAdmin = userData?.role === 'ADMIN'
  const [isModalActive, setIsModalActive] = useState(false)

  const handleAddItemToBasket = () => {
    dispatch(addItem({
      itemId: id + selectPrice,
      size: selectPrice,
      imageUrl,
      name,
      price: prices?.find(obj => obj.size === selectPrice)?.price
    }))
  }

  return (
    <Card elevation={2} className={cl.card} sx={{ width: 'min-content', p: 2 }}>
      {(isAdmin && !previewMode) &&
        <div className={cl.EditAndRemoveMenu}>
          <EditAndRemoveMenu editRoute={EDIT_PRODUCT_ROUTE} id={id} setIsModalActive={setIsModalActive} />
          <ElementDeleteModal
            password={name}
            deleteRoute='products'
            id={id}
            visible={isModalActive}
            onClose={() => setIsModalActive(false)}
            title='Віддалити продукт'
            body='Щоб віддалити продукт, треба ввести його назву:'
          />
        </div>
      }
      <MyImage src={imageUrl} />
      <p className={cl.name}>{name}</p>
      {ingredients &&
        <p style={{ margin: '10px 0' }}>
          {ingredients.map((i, index) => (
            <span key={index}>{i}{index !== ingredients.length - 1 ? ', ' : ''}</span>
          ))}
        </p>
      }
      {!previewMode &&
        <>
          {!isOnePrice &&
            <div className={cl.selectPriceHolder}>
              <MyButton active={selectPrice !== 'small' ? 'notActive' : 'active'} onClick={() => setSelectPrice("small")}>M</MyButton>
              <MyButton active={selectPrice !== 'medium' ? 'notActive' : 'active'} onClick={() => setSelectPrice("medium")}>L</MyButton>
              <MyButton active={selectPrice !== 'large' ? 'notActive' : 'active'} onClick={() => setSelectPrice("large")}>XL</MyButton>
            </div>
          }
          <p style={{ margin: '10px 0' }}>{prices?.find(obj => obj.size === selectPrice)?.price + 'грн'}</p>
          <MyButton onClick={handleAddItemToBasket}>Додати до кошику</MyButton>
        </>
      }
    </Card>
  )
}

export default ProductCard
