import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ABOUT_ROUTE, ALL_REVIEWS_ROUTE, BASKET_ROUTE, CONTACTS_ROUTE, CREATE_PRODUCT_ROUTE, CREATE_REVIEW_ROUTE, DELIVERY_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants';
import { BsFillBasket2Fill } from 'react-icons/bs'
import { Avatar, Container, IconButton, Typography } from '@mui/material';
import cl from './Layout.module.scss'

const Layout = ({ children }) => {
  const navigate = useNavigate()

  return (
    <div className={cl.layout}>
      <header className={cl.header}>
        <Link to={'/'}>
          <Typography>Dream Pizza</Typography>
        </Link>
        <Link to={DELIVERY_ROUTE}>Доставка</Link>
        <Link to={ABOUT_ROUTE}>Про нас</Link>
        <Link to={CONTACTS_ROUTE}>Контакти</Link>
        <Link to={ALL_REVIEWS_ROUTE}>Всі відгуки</Link>
        <Link to={CREATE_PRODUCT_ROUTE}>Створити новий товар</Link>
        <Link to={CREATE_REVIEW_ROUTE}>Написати відгук</Link>
        <IconButton onClick={() => navigate(BASKET_ROUTE)} aria-label="basket">
          <BsFillBasket2Fill />
        </IconButton>
        <IconButton onClick={() => navigate(LOGIN_ROUTE)} aria-label="basket">
          <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp" src="/broken-image.jpg" />
        </IconButton>
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