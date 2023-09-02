import React, { useEffect, useState } from 'react'
import { userLogout } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { myAxios } from '../../myAxios'
import { Button, CircularProgress, LinearProgress, Paper } from '@mui/material'
import ChangeUserData from './ChangeUserData'
import MyLoader from '../../components/UI/MyLoader'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import cl from './CabinetPage.module.scss'
import MyButton from '../../components/UI/button/MyButton'
import { CREATE_PRODUCT_ROUTE } from '../../utils/constants'

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
    if (window.confirm('Вийти?')) {
      dispatch(userLogout())
      navigate('/')
      window.location.reload()
    }
  }

  const restoreReviews = async () => {
    if (window.confirm('Відновити відгуки?')) {
      try {
        await myAxios.post('/reviews/copy')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const restoreProducts = async () => {
    if (window.confirm('Відновити продукти?')) {
      try {
        await myAxios.post('/products/copy')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const restoreTypes = async () => {
    if (window.confirm('Відновити типи продуктів?')) {
      try {
        await myAxios.post('/type/copy')
      } catch (error) {
        console.log(error)
      }
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
    <div className={cl.holder}>
      {isAdmin &&
        <Paper className={cl.adminPaper}>
          <p>Якщо ви хочете скинути продукти, коментарі або типи продуктів до початкового значення, ви можете зробити це тут.</p>
          <Button variant="contained" color='error' onClick={restoreReviews}>Відновити відгуки</Button>
          <Button variant="contained" color='error' onClick={restoreProducts}>Відновити продукти</Button>
          <Button variant="contained" color='error' onClick={restoreTypes}>Відновити типи</Button>
          <MyButton onClick={() => navigate(CREATE_PRODUCT_ROUTE)}>Створити товар</MyButton>
        </Paper>
      }
      <Paper className={cl.paper}>
        <p className={cl.userP}>Ім'я: <span>{data?.userData?.fullName}</span></p>
        <p className={cl.userP}>Пошта: <span>{data?.userData?.email}</span></p>
        <p className={cl.userP}>Дата реєстрації: <span>{formattedDate}</span></p>
        <ChangeUserData setOpen={setOpen} open={open} userData={data?.userData} />
        <div>
          <MyButton variant="contained" sx={{ mr: 2 }} onClick={() => setOpen(true)}>Змінити данні</MyButton>
          <Button color={'error'} variant='contained' onClick={logout}>Вийти</Button>
        </div>
      </Paper>
    </div>
  )
}

export default CabinetPage