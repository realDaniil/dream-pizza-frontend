import { useDispatch } from "react-redux";
import AppRouter from "./components/AppRouter";
import Layout from "./components/layout/Layout";
import { fetchUser } from "./store/actions/actions";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
    setLoading(false)
  }, [dispatch])

  if(loading) return <>Loading...</>

  return (
    <div className="App">
      <Layout>
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;
