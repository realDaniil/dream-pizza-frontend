import { Button, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateReview from './CreateReview'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../../store/actions/actions'
import { useNavigate } from 'react-router-dom'
import { REGISTRATION_ROUTE } from '../../../utils/constants'

const ReviewsBar = ({ filter, setFilter }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user?.userData)
  const [open, setOpen] = useState(false)


  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const isAuth = Boolean(userData)

  return (
    <Paper sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {!isAuth ?
        <>
          <h4>Зареєструйтесь, щоб мати можливість писати коментарі.</h4>
          <Button variant='contained' onClick={() => navigate(REGISTRATION_ROUTE)}>Зареєструватись</Button>
        </>
        :
        <>
          <Button variant={'contained'} onClick={() => setOpen(true)}>Створити відгук</Button>
          {/* <Button variant={'contained'} onClick={() => navigate(CREATE_REVIEW_ROUTE)}>Створити відгук</Button> */}
          <CreateReview open={open} setOpen={setOpen} />
        </>
      }
      <FormControl>
        <InputLabel>Сортувати</InputLabel>
        <Select
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