import { Box, Button, Modal, Paper, Rating, TextField, TextareaAutosize } from '@mui/material'
import React, { useEffect, useState } from 'react'
import cl from './CreateReview.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { myAxios } from '../../../myAxios'
import CreateReviewSkeleton from './CreateReviewSkeleton'

const CreateReview = ({ open, setOpen }) => {
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
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert(`Помилка при ${isEditing ? 'редагуванні' : 'створенні'} відгуку`)
    }
  }
  if (isLoading) return <CreateReviewSkeleton />
  return (
    <Modal
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Paper className={cl.paper}>
        <TextField
          color='warning'
          id="standard-basic"
          label="Заголовок"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaAutosize
          style={{ overflow: 'auto' }}
          className={cl.textarea}
          placeholder='Текст'
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
        <Box width={'100%'} mt={'1rem'} display={'flex'}>
          <Button fullWidth color='warning' onClick={onSubmit} variant="contained">{isEditing ? 'Змінити' : 'Відправити'}</Button>
          <Button sx={{ ml: '1rem' }} color='warning' onClick={() => navigate(setOpen(false))}>Відміна</Button>
        </Box>
      </Paper>
    </Modal>
  )
}

export default CreateReview