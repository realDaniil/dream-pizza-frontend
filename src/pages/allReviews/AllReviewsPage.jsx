import React, { useEffect, useState } from 'react'
import cl from './AllReviewsPage.module.scss'
import { myAxios } from '../../myAxios'
import ReviewCard from '../../components/reviews/reviewCard/ReviewCard'
import ReviewCardSkeleton from '../../components/reviews/reviewCard/ReviewCardSkeleton'
import { useQuery } from 'react-query'

const getReviews = async () => {
  const { data } = await myAxios.get('/reviews')
  return data
}

const AllReviewsPage = () => {
  const { data, isLoading } = useQuery('data', getReviews)
  document.body.style.overflow = isLoading ? 'hidden' : ''
  return (
    <div>
      {isLoading
        ? [...Array(5)].map((e, index) => <ReviewCardSkeleton key={index} />)
        : data?.map(review => <ReviewCard key={review._id} data={review} />)
      }
    </div>
  )
}

export default AllReviewsPage