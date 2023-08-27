import {  Card, Skeleton } from '@mui/material'
import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <Card sx={{width: 250, height: 450, p: 2}}>
      <Skeleton width={250} height={250} />
      <Skeleton sx={{height: 50}} />
      <Skeleton sx={{height: 30}} />
      <Skeleton sx={{height: 30}} />
      <Skeleton sx={{height: 30}} />
    </Card>
  )
}

export default ProductCardSkeleton