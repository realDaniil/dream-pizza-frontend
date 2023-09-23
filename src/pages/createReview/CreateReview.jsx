import { Box, Button, Paper, Rating, TextField, TextareaAutosize } from '@mui/material'
import React, { useEffect, useState } from 'react'
import cl from './CreateReview.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { ABOUT_ROUTE, LOGIN_ROUTE } from '../../utils/constants'
import { myAxios } from '../../myAxios'
import CreateReviewSkeleton from './CreateReviewSkeleton'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './../../store/slices/userSlice';
import MyLoader from '../../components/UI/MyLoader'

const CreateReview = () => {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [starsValue, setStarsValue] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.user?.userData)
  useEffect(() => {
    dispatch(fetchUser()).then(() => {
      if (!userData) navigate(LOGIN_ROUTE)
    })
  }, [dispatch])

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
      navigate(ABOUT_ROUTE)
    } catch (error) {
      console.log(error)
      alert(`Помилка при ${isEditing ? 'редагуванні' : 'створенні'} відгуку`)
    }
  }
  if (isLoading) return <MyLoader />
  return (
    <div className={cl.holder}>
      <Paper className={cl.paper}>
        <TextField
          color='warning'
          label="Заголовок"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaAutosize
          color='warning'
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
          <Button sx={{ ml: '1rem' }} color='warning' onClick={() => navigate(ABOUT_ROUTE)}>Відміна</Button>
        </Box>
      </Paper>
    </div>
  )
}

export default CreateReview