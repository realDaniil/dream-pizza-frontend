import React from 'react'
import cl from './HomePage.module.scss'
import GetProducts from '../../components/products/getProducts/GetProducts'

const HomePage = () => {
  return (
    <>
      <h2>Піца</h2>
      <GetProducts productType={'Піца'} />
      <h2>Соуси</h2>
      <GetProducts productType={'Соуси'} />
      <h2>Напої</h2>
      <GetProducts productType={'Напої'} />
    </>
  )
}

export default HomePage