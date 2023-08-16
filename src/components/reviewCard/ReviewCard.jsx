import { Rating } from '@mui/material'
import React, { useState } from 'react'
import ReviewCardSkeleton from './ReviewCardSkeleton'
import EditAndRemoveMenu from '../EditAndRemoveMenu'
import { EDIT_REVIEW_ROUTE } from '../../utils/constants'
import ElementDeleteModal from '../ElementDeleteModal'

const ReviewCard = ({ data }) => {
  const isUser = true
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
    <div>
      {isUser && <EditAndRemoveMenu editRoute={EDIT_REVIEW_ROUTE} id={data._id} setIsModalActive={setIsModalActive} />}
      user:
      {data.user.fullName}
      <br />
      {formattedDate}
      <h3>{data.title}</h3>
      <p>{data.text}</p>
      <Rating value={data.stars} readOnly />
      <ElementDeleteModal
        passwordMode={false}
        deleteRoute='products'
        id={data._id}
        visible={isModalActive}
        onClose={() => setIsModalActive(false)}
        title='Віддалити продукт'
        body='Ви впевнені, що хочете видалити відгук? Його не можна буде відновити.'
      />
    </div>
  )
}

export default ReviewCard



