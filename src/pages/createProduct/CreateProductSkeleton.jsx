import { Skeleton } from '@mui/material'
import React from 'react'

const CreateProductSkeleton = () => {
  return (
    <div>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </div>
  )
}

export default CreateProductSkeleton