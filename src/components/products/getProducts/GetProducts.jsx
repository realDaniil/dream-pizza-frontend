import { Grid } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import ProductCardSkeleton from '../productCard/ProductCardSkeleton'
import ProductCard from '../productCard/ProductCard'
import { myAxios } from '../../../myAxios'

const getProducts = async (type) => {
  let data
  if (type) {
    const response = await myAxios.get(`/products-by-type/${type}`)
    data = response.data
  } else {
    const response = await myAxios.get('/products')
    data = response.data
  }
  return data
}

const GetProducts = ({ productType }) => {
  const { data, isLoading, isError } = useQuery(['data', productType], () => getProducts(productType), { enabled: true, cacheTime: 0 })
  return (
    <Grid sx={{py: '2rem'}} container spacing={4}>
      {isLoading ?
        [...Array(10)].map((e, index) =>
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <ProductCardSkeleton />
          </Grid>)
        : data?.length === 0 ? <Grid item>Упс, щось пішло не так</Grid> :
          data?.map(e => (
            <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12} md={6} lg={4} xl={3} key={e._id}>
              <ProductCard
                key={e._id}
                ingredients={e.ingredients}
                imageUrl={e.imageUrl}
                prices={e.prices}
                name={e.name}
                type={e.type}
                id={e._id}
              />
            </Grid>
          ))}
    </Grid>
  )
}

export default GetProducts