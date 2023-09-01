import { Card, Skeleton } from '@mui/material'
import React from 'react'

const ReviewCardSkeleton = () => {
  return (
    <Card sx={{ width: '100%', p: 2, my: 4 }}>
      <Skeleton sx={{ height: 30 }} />
      <Skeleton sx={{ height: 30 }} />
      <Skeleton sx={{ height: 30 }} />
    </Card>
  )
}

export default ReviewCardSkeleton