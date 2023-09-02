import React, { useEffect, useRef, useState } from 'react'
import cl from './MainPage.module.scss'
import GetProducts from '../../components/products/getProducts/GetProducts'
import WelcomeSection from '../../components/welcomeSection/WelcomeSection';
import OurMenu from './ourMenu/OurMenu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/slices/userSlice';
import { CREATE_PRODUCT_ROUTE } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../components/UI/button/MyButton';
import { Container } from '@mui/material';

const MainPage = () => {
  const lastProductName = localStorage.getItem('last-product-name')
  const [nameProduct, setNameProduct] = useState(lastProductName || 'Піца')
  const productsRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.user?.userData)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div className={cl.holder}>
      <WelcomeSection setProduct={setNameProduct} scrollToProducts={scrollToProducts} />
      <Container maxWidth={'lg'}>
        {userData?.role === 'ADMIN' &&
          <MyButton onClick={() => navigate(CREATE_PRODUCT_ROUTE)}>Створити товар</MyButton>
        }
      </Container>
      <div ref={productsRef}>
        <GetProducts productType={nameProduct} />
      </div>
      <p className={cl.title}>Додатково</p>
      <GetProducts productType={'Додатково'} />
      <OurMenu scrollToProducts={scrollToProducts} />
      <p className={cl.title}>Спробуйте наші новинки та топи продажів</p>
      <GetProducts isGetTopSales />
    </div>
  )
}

export default MainPage