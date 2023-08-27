import { Box, Button, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { myAxios } from '../../myAxios'
import PasswordInput from '../../components/UI/PasswordInput'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const ChangeUserData = ({ userData, setOpen, open }) => {
  const [fullName, setFullName] = useState(userData?.fullName || '')
  const [email, setEmail] = useState(userData?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const onSubmit = async () => {
    try {
      const fields = {}
      function addIfNotEmpty(object, key, value) {
        if (value !== '') {
          object[key] = value
        }
      }
      addIfNotEmpty(fields, 'fullName', fullName)
      addIfNotEmpty(fields, 'email', email)
      addIfNotEmpty(fields, 'currentPassword', currentPassword)
      addIfNotEmpty(fields, 'password', newPassword)

      await myAxios.patch('/auth/update', fields)
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert(`Помилка при редагуванні`)
    }
  }
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box sx={style}>
        <TextField
          variant="standard"
          placeholder={userData?.fullName}
          error={fullName.length < 3 && fullName.length !== 0}
          helperText={fullName.length < 3 && fullName.length !== 0 && "Мінімум 3 символи"}
          label="Повне ім'я"
          fullWidth
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <TextField
          type='email'
          variant="standard"
          placeholder={userData?.email}
          label="Пошта"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Старий пароль"
          sx={{ width: '100%' }}
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
        />
        <PasswordInput
          label="Новий пароль"
          sx={{ width: '100%' }}
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <Button fullWidth variant="contained" onClick={onSubmit}>Змінити</Button>
      </Box>
    </Modal>
  )
}

export default ChangeUserData