import React, { useEffect, useState } from 'react'
import myAxios from '../myAxios'
import ProductCard from '../components/productCard/ProductCard'
import ProductCardSkeleton from '../components/productCard/ProductCardSkeleton'

const MainPage = () => {
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  if (isLoading) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await myAxios.get('/products')
        setAllProducts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getAllProducts()
  }, [])
  return (
    <div>
      {isLoading 
      ? [...Array(5)].map((e, index) => <ProductCardSkeleton key={index} />)
      :
        allProducts.map(e =>
          <ProductCard
            key={e._id}
            ingredients={e.ingredients}
            imageUrl={e.imageUrl}
            prices={e.prices}
            name={e.name}
            id={e._id}
          />
        )
      }

    </div>
  )
}

export default MainPage