import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';

const AppRouter = () => {
  const isAuth = true
  const isAdmin = true

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
