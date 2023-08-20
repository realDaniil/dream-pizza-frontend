import React, { useEffect, useState } from 'react'
import { userLogout } from '../../store/actions/actions'
import { useDispatch } from 'react-redux'
import { myAxios } from '../../myAxios'
import { Box, Button, Modal, TextField } from '@mui/material'
import ChangeUserData from './ChangeUserData'

const CabinetPage = () => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await myAxios.get('/auth/me')
        setUserData(data.userData)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getUserData()
  }, [])

  const createdAtDate = new Date(userData?.createdAt)
  const formattedDate =
    createdAtDate.getFullYear() + '-' +
    (createdAtDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
    createdAtDate.getDate().toString().padStart(2, '0') + ' ' +
    createdAtDate.getHours().toString().padStart(2, '0') + ':' +
    createdAtDate.getMinutes().toString().padStart(2, '0')
  if (isLoading) return <>Loading...</>
  return (
    <div>
      <button onClick={() => dispatch(userLogout())}>выйти</button>
      <h3>{userData?.fullName}</h3>
      <p>{userData?.email}</p>
      <p>Дата регистрации: {formattedDate}</p>
      <Button variant="contained" onClick={() => setOpen(true)}>Змінити данні</Button>
      <ChangeUserData setOpen={setOpen} open={open} userData={userData} />
    </div>
  )
}

export default CabinetPage