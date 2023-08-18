import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ABOUT_ROUTE, ALL_REVIEWS_ROUTE, BASKET_ROUTE, CABINET_ROUTE, CONTACTS_ROUTE, CREATE_PRODUCT_ROUTE, CREATE_REVIEW_ROUTE, DELIVERY_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants';
import { BsFillBasket2Fill } from 'react-icons/bs'
import { Avatar, Container, IconButton, Tooltip, Typography } from '@mui/material';
import cl from './Layout.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/actions/actions';

const Layout = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user?.userData)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <div className={cl.layout}>
      <header className={cl.header}>
        <div className={cl.logo_holder}>
          <Link to={'/'}>
            <img src="img/logo.svg" alt="Dream Pizza" />
          </Link>
        </div>
        <Link to={DELIVERY_ROUTE}>Доставка</Link>
        <Link to={ABOUT_ROUTE}>Про нас</Link>
        <Link to={CONTACTS_ROUTE}>Контакти</Link>
        <Link to={ALL_REVIEWS_ROUTE}>Всі відгуки</Link>
        <Link to={CREATE_PRODUCT_ROUTE}>Створити новий товар</Link>
        <Link to={CREATE_REVIEW_ROUTE}>Написати відгук</Link>
        <IconButton onClick={() => navigate(BASKET_ROUTE)}>
          <BsFillBasket2Fill />
        </IconButton>
        <Tooltip title={userData?.fullName}>
          <IconButton onClick={() => navigate(!userData ? LOGIN_ROUTE : CABINET_ROUTE)}>
            <Avatar sx={{ width: 30, height: 30 }}>{userData?.fullName[0]}</Avatar>
          </IconButton>
        </Tooltip>
      </header>
      <main>
        <Container>
          {children}
        </Container>
      </main>
      <footer>
        footer
      </footer>
    </div>
  )
}

export default Layout