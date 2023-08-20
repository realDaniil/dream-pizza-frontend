import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import ElementDeleteModal from '../ElementDeleteModal'
import EditAndRemoveMenu from '../EditAndRemoveMenu'
import { EDIT_PRODUCT_ROUTE } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../store/actions/actions'

const ProductCard = ({ name, prices, ingredients, imageUrl, type, id, previewMode = false }) => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user?.userData)
  const [src, setSrc] = useState(process.env.REACT_APP_API_URL + imageUrl)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  const isAdmin = userData?.role === 'ADMIN'
  const [isModalActive, setIsModalActive] = useState(false)


  const handleImageError = () => {
    setSrc('img/pizza.svg')
  }

  return (
    <Card sx={{ width: 'min-content', p: 2 }}>
      {(isAdmin && !previewMode) && <EditAndRemoveMenu editRoute={EDIT_PRODUCT_ROUTE} id={id} setIsModalActive={setIsModalActive} />}
      <img height={100} src={src} onError={handleImageError} alt={`Зображення продукту`} />
      <h2>{name}</h2>
      <pre>{ingredients}</pre>
      {prices && prices.map((e, index) => <p key={previewMode ? index : e._id}>Size: {e.size} Price: {e.price} грн</p>)}
      <p>Тип товару: {type}</p>
      <ElementDeleteModal
        password={name}
        deleteRoute='products'
        id={id}
        visible={isModalActive}
        onClose={() => setIsModalActive(false)}
        title='Віддалити продукт'
        body='Щоб віддалити продукт, треба ввести його назву:'
      />
    </Card>
  )
}

export default ProductCard
