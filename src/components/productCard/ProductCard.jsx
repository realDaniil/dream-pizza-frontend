import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import ElementDeleteModal from '../ElementDeleteModal'
import EditAndRemoveMenu from '../EditAndRemoveMenu'
import { EDIT_PRODUCT_ROUTE } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../store/actions/actions'

const ProductCard = ({ name, prices, ingredients, imageUrl, id }) => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user?.userData)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  const isAdmin = userData?.role === 'ADMIN'
  const [isModalActive, setIsModalActive] = useState(false)
  return (
    <Card sx={{ width: 'min-content', p: 2 }}>
      {isAdmin && <EditAndRemoveMenu editRoute={EDIT_PRODUCT_ROUTE} id={id} setIsModalActive={setIsModalActive} />}
      <img height={100} src={process.env.REACT_APP_API_URL + imageUrl} alt={`Зображення ${name}`} />
      <h2>{name}</h2>
      <pre>{ingredients}</pre>
      {prices.map(e => <p key={e._id}>Size: {e.size} Price: {e.price}</p>)}
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
