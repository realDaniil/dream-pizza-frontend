import React, { useEffect, useState } from 'react'
import cl from './AllReviews.module.scss'
import ReviewCard from '../../../components/reviews/reviewCard/ReviewCard'
import ReviewCardSkeleton from '../../../components/reviews/reviewCard/ReviewCardSkeleton'
import { useQuery } from 'react-query'
import { myAxios } from '../../../myAxios'
import { Button } from '@mui/material'

const getReviews = async (nameFiler, limit) => {
  if (nameFiler === 'Від більшої') {
    const { data } = await myAxios.get(`/reviews-from-high-to-low?limit=${limit}`)
    return data
  } else if (nameFiler === 'Від меншої') {
    const { data } = await myAxios.get(`/reviews-from-low-to-high?limit=${limit}`)
    return data
  } else {
    const { data } = await myAxios.get(`/reviews?limit=${limit}`)
    return data
  }
}

const AllReviews = ({ filter }) => {
  const [limit, setLimit] = useState(10)
  const { data, isLoading, refetch } = useQuery('data', () => getReviews(filter, limit))
  useEffect(() => {
    refetch()
  }, [filter, limit])
  if (isLoading) return [...Array(5)].map((e, index) => <ReviewCardSkeleton key={index} />)
  return (
    <div>
      {data?.map(review => <ReviewCard key={review._id} data={review} />)}
      {data?.length >= limit &&
        <Button color='warning' variant='contained' onClick={() => setLimit(prev => prev + 10)}>Завантажити ще</Button>
      }
    </div>
  )
}

export default AllReviews