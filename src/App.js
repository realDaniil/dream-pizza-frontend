import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./components/AppRouter";
import Layout from "./components/layout/Layout";
import { fetchUser } from "./store/slices/userSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  if (pathname !== '/login' && pathname !== '/registration') {
    window.sessionStorage.setItem('last-pathname', pathname)
  }
  const { user, loading } = useSelector(state => state.user)
  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  // if(loading) return <>Loading...</>
  return (
    <div className="App">
      <Layout>
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;
