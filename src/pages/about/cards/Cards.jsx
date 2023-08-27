import React from 'react'
import cl from './Cards.module.scss'
import { Card } from '@mui/material'

const Cards = () => {
  return (
    <div className={cl.wrapper}>
      <Card className={cl.card}>
        <div className={`${cl.img_holder} ${cl.img_holder1}`}></div>
        <p className={cl.text}><span>«Dream Pizza»</span> - це ретельно підібрана рецептура та технологія приготування тіста.</p>
      </Card>
      <Card className={cl.card}>
        <div className={`${cl.img_holder} ${cl.img_holder2}`}></div>
        <p className={cl.text}><span>«Dream Pizza»</span> - це піца, де по-справжньому багато сиру!</p>
      </Card>
      <Card className={cl.card}>
        <div className={`${cl.img_holder} ${cl.img_holder3}`}></div>
        <p className={cl.text}><span>«Dream Pizza»</span> - це приготування піци в печі на дровах, що надає їй невимовний смак, колір та аромат.</p>
      </Card>
    </div>
  )
}

export default Cards