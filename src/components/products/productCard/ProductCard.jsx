import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import ElementDeleteModal from '../../UI/ElementDeleteModal'
import EditAndRemoveMenu from '../../UI/EditAndRemoveMenu'
import { EDIT_PRODUCT_ROUTE } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../../store/actions/actions'
import pizza from '../../../img/pizza.svg'
import cl from './ProductCard.module.scss'
import MyButton from '../../UI/button/MyButton'

const ProductCard = ({ name, prices, ingredients, imageUrl, type, id, previewMode = false }) => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user?.userData)
  const [src, setSrc] = useState(process.env.REACT_APP_API_URL + imageUrl)
  const isOnePrice = (typeof prices !== 'undefined' && prices[0]?.size === 'any')
  const [selectPrice, setSelectPrice] = useState(isOnePrice ? 'any' : 'small')

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  const isAdmin = userData?.role === 'ADMIN'
  const [isModalActive, setIsModalActive] = useState(false)

  const handleImageError = () => {
    setSrc(pizza)
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
      <div className={cl.img_holder}>
        <img src={src} onError={handleImageError} alt={`Зображення продукту`} />
      </div>
      <h2 className={cl.name}>{name}</h2>
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
              <MyButton variant={selectPrice !== 'small' ? 'notActive' : 'active'} onClick={() => setSelectPrice("small")}>Стандартна</MyButton>
              <MyButton variant={selectPrice !== 'medium' ? 'notActive' : 'active'} onClick={() => setSelectPrice("medium")}>Велика</MyButton>
              <MyButton variant={selectPrice !== 'large' ? 'notActive' : 'active'} onClick={() => setSelectPrice("large")}>Супервелика</MyButton>
            </div>
          }
          <p style={{ margin: '10px 0' }}>{prices?.find(obj => obj.size === selectPrice)?.price + 'грн'}</p>
          <MyButton>Додати до кошику</MyButton>
        </>
      }
    </Card>
  )
}

export default ProductCard
