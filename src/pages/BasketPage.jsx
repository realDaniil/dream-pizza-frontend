import React from 'react'
import { myAxios } from '../myAxios'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../store/slices/basketSlice'
import ProductCard from '../components/products/productCard/ProductCard'

const getProducts = async (ids) => {
  const { data } = await myAxios.get(`/products-ids?productIds=${ids}`)
  return data
}

const BasketPage = () => {
  const basketItems = useSelector(state => state.basket.items)
  const dispatch = useDispatch()
  const idsArray = basketItems.map(item => item.id)
  const idsString = idsArray.join(',')
  const { data, isLoading } = useQuery('data', () => getProducts(idsString))
  console.log(data)

  return (
    <div>
      {data?.map(e =>
        <ProductCard
          key={e._id}
          ingredients={e.ingredients}
          imageUrl={e.imageUrl}
          prices={e.prices}
          name={e.name}
          type={e.type}
          id={e._id}
        />
      )}
    </div>
  )
}

export default BasketPage