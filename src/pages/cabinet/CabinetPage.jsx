import React, { useEffect, useState } from 'react'
import { userLogout } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { myAxios } from '../../myAxios'
import { Button, CircularProgress, LinearProgress } from '@mui/material'
import ChangeUserData from './ChangeUserData'
import MyLoader from '../../components/UI/MyLoader'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

const getUserData = async () => {
  const { data } = await myAxios.get('/auth/me')
  return data
}

const CabinetPage = () => {
  const dispatch = useDispatch()
  const { data, isLoading } = useQuery('userData', getUserData)
  const isAdmin = data?.userData?.role === 'ADMIN'
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const logout = () => {
    dispatch(userLogout())
    navigate('/')
  }

  const restoreReviews = async () => {
    try {
      await myAxios.post('/reviews/copy')
    } catch (error) {
      console.log(error)
    }
  }

  const restoreProducts = async () => {
    try {
      await myAxios.post('/products/copy')
    } catch (error) {
      console.log(error)
    }
  }

  const restoreTypes = async () => {
    try {
      await myAxios.post('/type/copy')
    } catch (error) {
      console.log(error)
    }
  }


  const createdAtDate = new Date(data?.userData?.createdAt)
  const formattedDate =
    createdAtDate.getFullYear() + '-' +
    (createdAtDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
    createdAtDate.getDate().toString().padStart(2, '0') + ' ' +
    createdAtDate.getHours().toString().padStart(2, '0') + ':' +
    createdAtDate.getMinutes().toString().padStart(2, '0')
  if (isLoading) return <MyLoader />
  return (
    <div>
      {isAdmin &&
        <div>
          <Button variant="contained" color='error' onClick={restoreReviews}>Відновити відгуки</Button>
          <Button variant="contained" color='error' onClick={restoreProducts}>Відновити продукти</Button>
          <Button variant="contained" color='error' onClick={restoreTypes}>Відновити типи</Button>
        </div>
      }
      <Button variant='contained' onClick={logout}>выйти</Button>
      <h3>{data?.userData?.fullName}</h3>
      <p>{data?.userData?.email}</p>
      <p>Дата регистрации: {formattedDate}</p>
      <Button variant="contained" onClick={() => setOpen(true)}>Змінити данні</Button>
      <ChangeUserData setOpen={setOpen} open={open} userData={data?.userData} />
    </div>
  )
}

export default CabinetPage