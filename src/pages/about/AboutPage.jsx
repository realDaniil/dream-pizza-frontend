import React, { useState } from 'react'
import AllReviews from '../../components/reviews/get/AllReviews'
import CreateReview from '../../components/reviews/create/CreateReview'
import ReviewsBar from '../../components/reviews/create/ReviewsBar'
import Gallery from './gallery/Gallery'
import cl from './About.module.scss'
import { Typography } from '@mui/material'
import Cards from './cards/Cards'

const AboutPage = () => {
  const [filter, setFilter] = useState('')
  return (
    <div>
      <div className={cl.welcomeSectionHolder}>
        <div className={cl.welcomeSection}>
          <h2 style={{fontSize: 38}}>Про нас</h2>
        </div>
      </div>
      <Typography variant='h5' sx={{color: '#f96a0c', my: '1rem'}}>Найсвіжіша, ароматна піца з доставкою по Чорноморську.</Typography>
      <p>«Жар-піца». Не думай. Їж.</p>
      <p style={{margin: '1rem 0'}}>Піца додому, офіс, на природу – це простий спосіб вгамувати голод. У нашому меню також є позиції для м'ясоїдів та любителів морепродуктів.</p>
      <Cards />
      <Gallery />
      <ReviewsBar filter={filter} setFilter={setFilter} />
      <AllReviews filter={filter} />
    </div>
  )
}

export default AboutPage