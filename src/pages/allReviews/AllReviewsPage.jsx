import React, { useEffect, useState } from 'react'
import cl from './AllReviewsPage.module.scss'
import myAxios from '../../myAxios'
import ReviewCard from '../../components/reviewCard/ReviewCard'
import ReviewCardSkeleton from '../../components/reviewCard/ReviewCardSkeleton'

const AllReviewsPage = () => {
  const [allReviews, setAllReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  if (isLoading) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const { data } = await myAxios.get('/reviews')
        setAllReviews(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getAllReviews()
  }, [])
  return (
    <div>
      {isLoading
        ?  [...Array(5)].map((e, index) => <ReviewCardSkeleton key={index} />)
        : allReviews.map(review => <ReviewCard key={review._id} data={review} />)
      }
    </div>
  )
}

export default AllReviewsPage