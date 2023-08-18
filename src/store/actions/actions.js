import myAxios from '../../myAxios'

export const setUser = (userData) => {
  return {
    type: 'SET_USER',
    payload: userData,
  }
}

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem('token') !== null) {
        const { data } = await myAxios.get('/auth/me')
        dispatch(setUser(data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const userLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('token')
    dispatch(setUser(null))
  }
}