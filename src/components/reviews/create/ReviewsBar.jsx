import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateReview from './CreateReview'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { REGISTRATION_ROUTE } from '../../../utils/constants'
import cl from './ReviewsBar.module.scss'
import MyButton from '../../UI/button/MyButton'

const ReviewsBar = ({ filter, setFilter }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.user?.userData)
  const [open, setOpen] = useState(false)


  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const isAuth = Boolean(userData)

  return (
    <Paper className={cl.paper} >
      {!isAuth ?
        <Box className={cl.box}>
          <h4>Зареєструйтесь, щоб мати можливість писати коментарі.</h4>
          <MyButton sx={{ ml: 1, minWidth: 'min-content' }} onClick={() => navigate(REGISTRATION_ROUTE)}>Зареєструватись</MyButton>
        </Box>
        :
        <>
          <Button color={'warning'} variant={'contained'} onClick={() => setOpen(true)}>Створити відгук</Button>
          {/* <Button variant={'contained'} onClick={() => navigate(CREATE_REVIEW_ROUTE)}>Створити відгук</Button> */}
          <CreateReview open={open} setOpen={setOpen} />
        </>
      }
      <FormControl>
        <InputLabel color={'warning'}>Сортувати</InputLabel>
        <Select
          color={'warning'}
          value={filter || 'Не сортувати'}
          label={'Тип продукту'}
          onChange={e => setFilter(e.target.value)}
        >
          <MenuItem value={'Не сортувати'}>
            {'Не сортувати'}
          </MenuItem>
          <MenuItem value={'Від більшої'}>
            {'Від більшої'}
          </MenuItem>
          <MenuItem value={'Від меншої'}>
            {'Від меншої'}
          </MenuItem>
        </Select>
      </FormControl>
    </Paper>
  )
}

export default ReviewsBar