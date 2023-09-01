import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants'
import { Avatar, Button, FormControl, InputLabel, Paper, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form'
import cl from './AuthPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { myAxios } from '../../myAxios'
import PasswordInput from '../../components/UI/PasswordInput';
import { fetchUser } from '../../store/slices/userSlice';

const AuthPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.user)
  const lastPathname = window.sessionStorage.getItem('last-pathname')
  useEffect(() => {
    dispatch(fetchUser()).then(() => {
      if (isAuth) {
        navigate(lastPathname || '/')
      }
    })
  }, [dispatch])

  const location = useLocation()
  const isLoginPage = location.pathname === LOGIN_ROUTE
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange',
  })
  const onSubmit = async (values) => {
    if (isLoginPage) {
      try {
        const { data } = await myAxios.post('/auth/login', values)
        window.localStorage.setItem('token', data.token)
        navigate(lastPathname || '/')
      } catch (error) {
        console.error(error)
        alert('Помилка при авторизації')
      }
    } else {
      try {
        const { data } = await myAxios.post('/auth/registration', values)
        window.localStorage.setItem('token', data.token)
        navigate(lastPathname || '/')
      } catch (error) {
        console.error(error)
        alert('Помилка при реєстрації')
      }
    }
  }

  const fullNameValidate = value => {
    return value.length >= 3 || "Повне ім'я повинне мати як мінімум 3 символи"
  }

  const passwordValidate = value => {
    return value.length >= 5 || "Пароль повинен мати як мінімум 5 символів"
  }

  return (
    <div className={cl.holder}>
      <Paper className={cl.paper}>
        <Typography variant="h5" className={cl.title}>{isLoginPage ? 'Вхід до облікового запису' : 'Створення облікового запису'}</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLoginPage &&
            <>
              <div className={cl.avatar}>
                <Avatar sx={{ width: 100, height: 100, mb: '20px', mx: 'auto' }} />
              </div>
              <TextField
                color='warning'
                {...register('fullName', { required: "Вкажіть повне ім'я", validate: fullNameValidate })}
                helperText={errors.fullName?.message}
                error={Boolean(errors.fullName?.message)}
                sx={{ mb: 3 }}
                label="Повне ім'я"
                fullWidth
              />
            </>
          }
          <TextField
            color='warning'
            {...register('email', { required: 'Вкажіть пошту' })}
            helperText={errors.email?.message}
            error={Boolean(errors.email?.message)}
            sx={{ mb: 3 }}
            label="Email"
            variant="outlined"
            type='email'
            fullWidth
          />
          <PasswordInput
            sx={{ width: '100%', mb: 3 }}
            variant='outlined'
            label='Пароль'
            helperText={errors.password?.message}
            error={Boolean(errors.password?.message)}
            register={register('password', { required: 'Вкажіть пароль', validate: passwordValidate })}
          />
          <Button
            color='warning'
            type='submit'
            sx={{ mb: 3 }}
            size="large"
            variant="contained"
            disabled={!isValid}
            fullWidth
          >
            {isLoginPage ? 'Увійти' : 'Реєстрація'}
          </Button>
        </form>
        {isLoginPage ?
          <div>
            Немає облікового запису? <Link to={REGISTRATION_ROUTE}>Зареєструйтесь!</Link>
          </div>
          :
          <div>
            Вже є обліковий запис? <Link to={LOGIN_ROUTE}>Увійдіть!</Link>
          </div>
        }
        <br />
        <b>Админ данные:<br />admin@mail.com<br />qwerty</b>
      </Paper>
    </div>
  )
}

export default AuthPage