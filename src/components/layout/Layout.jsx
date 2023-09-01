import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ABOUT_ROUTE, CABINET_ROUTE, CREATE_REVIEW_ROUTE, LOGIN_ROUTE } from '../../utils/constants';
import { AppBar, Avatar, Container, IconButton, Tooltip } from '@mui/material';
import cl from './Layout.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/slices/userSlice';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import logo from '../../img/logo_white.svg'
import UpButton from '../UI/upButton/UpButton';
import Basket from '../basket/Basket';
import { BsTelegram, BsTwitter, BsFacebook, BsInstagram } from 'react-icons/bs'

const Layout = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.user?.userData)
  const { pathname } = useLocation()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <div className={cl.layout}>
      <AppBar position={'static'} className={cl.appBar}>
        <Container maxWidth={'xl'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className={cl.logo_holder}>
            <Link to={'/'}>
              <img src={logo} alt="Dream Pizza" />
            </Link>
          </div>
          <Tooltip title={userData?.fullName}>
            <IconButton onClick={() => navigate(!userData ? LOGIN_ROUTE : CABINET_ROUTE)}>
              {userData?.role === 'ADMIN'
                ? <Avatar sx={{ width: 30, height: 30 }}><VerifiedUserIcon style={{ color: 'white' }} /></Avatar>
                : <Avatar sx={{ width: 30, height: 30 }}>{userData?.fullName[0]}</Avatar>
              }
            </IconButton>
          </Tooltip>
        </Container>
      </AppBar>
      <main>
        <Container maxWidth={'lg'}>
          {children}
        </Container>
      </main>
      <Basket />
      <UpButton />
      {(pathname === '/' || pathname === ABOUT_ROUTE)
        ?
        <footer>
          <Container className={cl.container} maxWidth={'lg'}>
            <div className={cl.logoHolder}>
              <Link to={'/'}>
                <img src={logo} alt="Dream Pizza" />
              </Link>
            </div>
            <div className={cl.footerLinksHolder}>
              <Link to={'/'}>Головна</Link>
              <Link to={ABOUT_ROUTE}>Про нас</Link>
              <Link to={CREATE_REVIEW_ROUTE}>Написати відгук</Link>
            </div>
            <div className={cl.schedule}>
              <p className={cl.title}>Графік роботи</p>
              <p>11:00 - 22:30</p>
              <p>без вихідних</p>
            </div>
            <div className={cl.contactsHolder}>
              <p className={cl.title}>Контакти</p>
              <a href="tel:+3806323452660">063 234 56 60</a>
              <a href="tel:+3809623452660">096 234 56 60</a>
              <a href="tel:+3805023452660">050 234 56 60</a>
            </div>
            <div className={cl.socialMedia}>
              <p className={cl.title}>Слідкуйте за нами</p>
              <div className={cl.followUsLinksHolder}>
                <a target='_blank' href="https://www.instagram.com/">
                  <BsInstagram />
                </a>
                <a target='_blank' href="https://web.telegram.org/">
                  <BsTelegram />
                </a>
                <a target='_blank' href="https://www.facebook.com/">
                  <BsFacebook />
                </a>
                <a target='_blank' href="https://twitter.com/">
                  <BsTwitter />
                </a>
              </div>
            </div>
          </Container>
        </footer >
        : null
      }
    </div>
  )
}

export default Layout