import React from 'react'
import cl from './OurMenu.module.scss'
import img from '../../../img/our-menu.png'
import MyButton from '../../../components/UI/button/MyButton'

const OurMenu = ({scrollToProducts}) => {
  return (
    <div className={cl.holder}>
    <div className={cl.back}></div>
    <div className={cl.content}>
      <div className={cl.leftSide}>
        <h2>Наше меню</h2>
        <p>Наше меню різноманітне. Доставка суші, ролів, сетів, піци, WOK коробочок, пасти, салатів, напоїв та бургерів не займе багато часу. Ми працюємо з 11:00 до 22:30 та без вихідних.</p>
          <MyButton size='large' onClick={scrollToProducts}>Замовити</MyButton>
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

export default OurMenu