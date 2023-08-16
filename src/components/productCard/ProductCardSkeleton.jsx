import {  Card, Skeleton } from '@mui/material'
import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <Card sx={{width: 150, p: 2}}>
      <Skeleton sx={{height: 130}} />
      <Skeleton sx={{height: 30}} />
      <Skeleton sx={{height: 30}} />
    </Card>
  )
}

export default ProductCardSkeleton