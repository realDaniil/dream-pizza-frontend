import React, { useState } from 'react'
import AllReviews from '../../components/reviews/get/AllReviews'
import ReviewsBar from '../../components/reviews/create/ReviewsBar'
import Gallery from './gallery/Gallery'
import cl from './About.module.scss'
import Cards from './cards/Cards'
import MyButton from '../../components/UI/button/MyButton'
import pizza from '../../img/big_pizza.png'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Modal, Paper } from '@mui/material';
import delivery from '../../img/delivery.jpg'

const AboutPage = () => {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const navigate = useNavigate()
  return (
    <div>
      <div className={cl.welcomeHolder}>
        <div className={cl.welcomeBack}></div>
        <div className={cl.welcome}>
          <div className={cl.leftSide}>
            <h1>Про нас</h1>
            <p>Найсвіжіша, ароматна піца з доставкою по Одесі.</p>
            <p>«Dream Pizza». Не думай. Їж.</p>
            <p>Піца додому, офіс, на природу – це простий спосіб вгамувати голод. У нашому меню також є позиції для м'ясоїдів та любителів морепродуктів.</p>
            <div className={cl.btnsHolder}>
              <MyButton size='large' onClick={() => navigate('/')}>Замовити</MyButton>
              <div onClick={() => setOpen(true)}><ShoppingCartIcon /><p>Умови доставки</p></div>
            </div>
          </div>
          <div className={cl.rightSide}>
            <div className={cl.imgHolder}>
              <img src={pizza} alt="Дуже смачна страва" />
            </div>
          </div>
        </div>
      </div>
      <Modal
        sx={{ display: 'flex', justifyContent: 'center', overflow: 'auto' }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Paper className={cl.deliveryPaper}>
          <img src={delivery} width={'100%'} alt="Dream Pizza" />
          <p>Ми приймаємо замовлення на доставку щодня без вихідних та свят з 11:00 до 22:30.</p>
          <p>Увага! Доставка здійснюється нашим кур'єром.</p>
          <p>Час та вартість доставки обговорюється з оператором.</p>
          <p>Ви завжди можете зробити замовлення на певний час.</p>
          <p>Оплата за доставку здійснюється кур'єру готівкою, або шляхом переказу на картку.</p>
          <p>Кур'єр повинен Вам передати чек разом із Вашим замовленням.</p>
          <p>Дякуємо, що Ви з нами! З любов'ю, команда Dream Pizza ❤️</p>
        </Paper>
      </Modal>
      {/* <Cards /> */}
      <Gallery />
      <ReviewsBar filter={filter} setFilter={setFilter} />
      <AllReviews filter={filter} />
    </div>
  )
}

export default AboutPage
