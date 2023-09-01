import React, { useEffect, useRef, useState } from 'react'
import MyButton from '../../components/UI/button/MyButton'
import cl from './WelcomeSection.module.scss'
import pizza from '../../img/welcome/welcome-pizza.png'
import rolls from '../../img/welcome/welcome-rolls.png'
import wok from '../../img/welcome/welcome-wok.png'
import burger from '../../img/welcome/welcome-burger.png'
import pasta from '../../img/welcome/welcome-pasta.png'
import salad from '../../img/welcome/welcome-salad.png'
import drinks from '../../img/welcome/welcome-drinks.png'
import { ABOUT_ROUTE } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

const WelcomeSection = ({ setProduct, scrollToProducts }) => {
  const lastProductName = localStorage.getItem('last-product-name')
  const navRef = useRef(null)
  const [img, setImg] = useState(pizza)
  const navigate = useNavigate()
  const [activeProduct, setActiveProduct] = useState(lastProductName || 'Піца')

  const selectProductButton = (product) => {
    if (product === 'Піца') setImg(pizza)
    else if (product === 'Роли') setImg(rolls)
    else if (product === 'WOK') setImg(wok)
    else if (product === 'Бургери') setImg(burger)
    else if (product === 'Паста') setImg(pasta)
    else if (product === 'Салати') setImg(salad)
    else if (product === 'Напої') setImg(drinks)
    else setImg(pizza)
  }

  useEffect(() => {
    navRef.current.addEventListener('click', e => {
      if (e.target.tagName === 'P') {
        const product = e.target.getAttribute('data-product')
        setProduct(product)
        setActiveProduct(product)
        selectProductButton(product)
        localStorage.setItem('last-product-name', product)
      }
    })
    selectProductButton(lastProductName)
  }, [])
  return (
    <div className={cl.welcomeHolder}>
      <div className={cl.welcomeBack}></div>
      <nav ref={navRef} className={cl.nav}>
        <p data-product='Піца' className={activeProduct === 'Піца' ? cl.active : ''}>Піца</p>
        <p data-product='Роли' className={activeProduct === 'Роли' ? cl.active : ''}>Роли</p>
        <p data-product='WOK' className={activeProduct === 'WOK' ? cl.active : ''}>WOK</p>
        <p data-product='Бургери' className={activeProduct === 'Бургери' ? cl.active : ''}>Бургери</p>
        <p data-product='Паста' className={activeProduct === 'Паста' ? cl.active : ''}>Паста</p>
        <p data-product='Салати' className={activeProduct === 'Салати' ? cl.active : ''}>Салати</p>
        <p data-product='Напої' className={activeProduct === 'Напої' ? cl.active : ''}>Напої</p>
      </nav>
      <div className={cl.welcome}>
        <div className={cl.leftSide}>
          <h1>З коханням доставка Піци в Чорноморську</h1>
          <p>Замовте піцу, в офіс або на природу в онлайн ресторані Dream Pizza. Ми працюємо з 11:00 до 22:30 та без вихідних.</p>
          <div className={cl.btnsHolder}>
            <MyButton size='large' onClick={scrollToProducts}>Замовити</MyButton>
            <div onClick={() => navigate(ABOUT_ROUTE)}><p>Про нас</p></div>
          </div>
        </div>
        <div className={cl.rightSide}>
          <div className={cl.imgHolder}>
            <img src={img} alt="Дуже смачна страва" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeSection