import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/actions/actions';
import { useEffect } from 'react';

const AppRouter = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user?.userData)
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const isAuth = Boolean(userData)
  const isAdmin = userData?.role === 'ADMIN'
  // const isAuth = true
  // const isAdmin = true
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
