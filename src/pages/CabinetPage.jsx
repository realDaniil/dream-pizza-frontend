import React from 'react'
import { userLogout } from '../store/actions/actions'
import { useDispatch } from 'react-redux'

const CabinetPage = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch(userLogout())}>logout</button>
    </div>
  )
}

export default CabinetPage