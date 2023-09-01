import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/slices/userSlice';
import { useEffect, useState } from 'react';
import MyLoader from './UI/MyLoader';

const AppRouter = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.user?.userData)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    dispatch(fetchUser())
      .then(() => {
        setIsLoading(false)
      })
  }, [dispatch])  

  const isAuth = Boolean(userData)
  const isAdmin = userData?.role === 'ADMIN'

  if (isLoading) return <MyLoader />

  return (
    <Routes>
      {isAuth && authRoutes.map(({ path, Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      {isAdmin && adminRoutes.map(({ path, Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      {publicRoutes.map(({ path, Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      <Route path='*' element={<MainPage />} />
    </Routes>
  )
}

export default AppRouter
