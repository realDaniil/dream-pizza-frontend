import { Card, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReviewCardSkeleton from './ReviewCardSkeleton'
import EditAndRemoveMenu from '../EditAndRemoveMenu'
import { EDIT_REVIEW_ROUTE } from '../../utils/constants'
import ElementDeleteModal from '../ElementDeleteModal'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../store/actions/actions'

const ReviewCard = ({ data }) => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user?.userData)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  const isUser = (typeof data?.user?._id === 'string' && typeof userData?._id === 'string') && data?.user?._id === userData?._id
  const isAdmin = userData?.role === 'ADMIN'
  const [isModalActive, setIsModalActive] = useState(false)
  const isLoading = Boolean(!data)
  if (isLoading) return <ReviewCardSkeleton />

  const updatedAtString = data.updatedAt
  const updatedAtDate = new Date(updatedAtString)
  const formattedDate =
    updatedAtDate.getFullYear() + '-' +
    (updatedAtDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
    updatedAtDate.getDate().toString().padStart(2, '0') + ' ' +
    updatedAtDate.getHours().toString().padStart(2, '0') + ':' +
    updatedAtDate.getMinutes().toString().padStart(2, '0')
  return (
    <Card sx={{ my: 4 }}>
      {(isUser || isAdmin) && <EditAndRemoveMenu editRoute={EDIT_REVIEW_ROUTE} id={data._id} setIsModalActive={setIsModalActive} />}
      user:
      {data?.user?.fullName ? data?.user?.fullName : 'Анонім'}
      <br />
      {formattedDate}
      <h3>{data.title}</h3>
      <p>{data.text}</p>
      <Rating value={data.stars} readOnly />
      <ElementDeleteModal
        passwordMode={false}
        deleteRoute='reviews'
        id={data._id}
        visible={isModalActive}
        onClose={() => setIsModalActive(false)}
        title='Віддалити продукт'
        body='Ви впевнені, що хочете видалити відгук? Його не можна буде відновити.'
      />
    </Card>
  )
}

export default ReviewCard



