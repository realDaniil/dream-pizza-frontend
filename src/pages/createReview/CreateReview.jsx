import { Button, Paper, Rating, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import cl from './CreateReview.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { ALL_REVIEWS_ROUTE } from '../../utils/constants'
import { myAxios } from '../../myAxios'
import CreateReviewSkeleton from './CreateReviewSkeleton'

const CreateReview = () => {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [starsValue, setStarsValue] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isEditing) {
      myAxios.get(`/reviews/${id}`)
        .then(({ data }) => {
          setTitle(data.title || '')
          setText(data.text || '')
          setStarsValue(data.stars || '')
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [id])

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        text,
        stars: starsValue,
      }
      isEditing
        ? await myAxios.patch(`/reviews/${id}`, fields)
        : await myAxios.post('/reviews', fields)
      navigate(ALL_REVIEWS_ROUTE)
    } catch (error) {
      console.log(error)
      alert(`Помилка при ${isEditing ? 'редагуванні' : 'створенні'} відгуку`)
    }
  }
  if (isLoading) return <CreateReviewSkeleton />
  return (
    <div>
      <Paper className={cl.paper}>
        <TextField
          id="standard-basic"
          label="Заголовок"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Текст"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Rating
          name="simple-controlled"
          value={starsValue}
          onChange={(event, newValue) => {
            setStarsValue(newValue)
          }}
        /> 
        <Button variant="outlined" onClick={() => navigate(ALL_REVIEWS_ROUTE)}>Відміна</Button>
        <Button onClick={onSubmit} variant="contained">{isEditing ? 'Змінити' : 'Відправити'}</Button>
      </Paper>
    </div>
  )
}

export default CreateReview