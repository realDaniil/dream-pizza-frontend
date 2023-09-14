import { Grid } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import ProductCardSkeleton from '../productCard/ProductCardSkeleton'
import ProductCard from '../productCard/ProductCard'
import { myAxios } from '../../../myAxios'

const getProducts = async (type, isGetTopSales) => {
  if (isGetTopSales) {
    const { data } = await myAxios.get('/products-top-sales')
    return data
  }
  if (type) {
    const { data } = await myAxios.get(`/products-by-type/${type}`)
    return data
  } else {
    const { data } = await myAxios.get('/products')
    return data
  }
}

const GetProducts = ({ productType, isGetTopSales = false }) => {
  const { data, isLoading, isError } = useQuery(['data', productType], () => getProducts(productType, isGetTopSales), { enabled: true, cacheTime: 0 })
  return (
    <Grid sx={{ py: '2rem' }} container spacing={4}>
      {isLoading ?
        [...Array(10)].map((e, index) =>
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <ProductCardSkeleton />
          </Grid>)
        : data?.length === 0 ? <Grid item>Упс, щось пішло не так</Grid> :
          data?.map(e => (
            <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12} sm={6} md={4} lg={3} key={e._id}>
              <ProductCard
                key={e._id}
                ingredients={e.ingredients}
                imageUrl={e.imageUrl}
                prices={e.prices}
                name={e.name}
                isTopSales={e.isTopSales}
                type={e.type}
                id={e._id}
              />
            </Grid>
          ))}
    </Grid>
  )
}

export default GetProducts