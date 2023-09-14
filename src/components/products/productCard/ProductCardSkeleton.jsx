import {  Card, Skeleton } from '@mui/material'
import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <Card sx={{width: 240, height: 450, p: 2}}>
      <Skeleton width={240} height={240} />
      <Skeleton sx={{height: 50}} />
      <Skeleton sx={{height: 30}} />
      <Skeleton sx={{height: 30}} />
      <Skeleton sx={{height: 30}} />
    </Card>
  )
}

export default ProductCardSkeleton