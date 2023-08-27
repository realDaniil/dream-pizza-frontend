import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants'
import { Avatar, Button, FormControl, InputLabel, Paper, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form'
import cl from './AuthPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { myAxios } from '../../myAxios'
import { fetchUser } from '../../store/actions/actions';
import PasswordInput from '../../components/UI/PasswordInput';

const AuthPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user)
  useEffect(() => {
    dispatch(fetchUser())
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
        navigate('/')
      } catch (error) {
        console.error(error)
        alert('Помилка при авторизації')
      }
    } else {
      try {
        const { data } = await myAxios.post('/auth/registration', values)
        window.localStorage.setItem('token', data.token)
        navigate('/')
      } catch (error) {
        console.error(error)
        alert('Помилка при реєстрації')
      }
    }
  }
  if (isAuth) {
    navigate('/')
  }

  const fullNameValidate = value => {
    return value.length >= 3 || "Повне ім'я повинне мати як мінімум 3 символи"
  }

  const passwordValidate = value => {
    return value.length >= 5 || "Пароль повинен мати як мінімум 5 символів"
  }

  return (
    <Paper className={cl.paper}>
      <Typography variant="h5" className={cl.title}>{isLoginPage ? 'Вхід до облікового запису' : 'Створення облікового запису'}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isLoginPage &&
          <>
            <div className={cl.avatar}>
              <Avatar sx={{ width: 100, height: 100, mb: '20px', mx: 'auto' }} />
            </div>
            <TextField
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
          {...register('email', { required: 'Вкажіть пошту' })}
          helperText={errors.email?.message}
          error={Boolean(errors.email?.message)}
          sx={{ mb: 3 }}
          label="Email"
          variant="outlined"
          type='email'
          fullWidth
        />
        {/* <TextField
          {...register('password', { required: 'Вкажіть пароль', validate: passwordValidate })}
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          sx={{ mb: 3 }}
          label="Пароль"
          variant="outlined"
          fullWidth
        /> */}
        <PasswordInput
          sx={{width: '100%', mb: 3}}
          variant='outlined'
          label='Пароль'
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          register={register('password', { required: 'Вкажіть пароль', validate: passwordValidate })}
        />
        <Button
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
  )
}

export default AuthPage