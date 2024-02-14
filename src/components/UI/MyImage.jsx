import React, { useEffect, useState } from 'react'
import pizza from '../../img/pizza.svg'
import { Skeleton } from '@mui/material'

const MyImage = ({ src, style }) => {
  const [imageSrc, setImageUrl] = useState(src)
  const [imgLoaded, setImgLoaded] = useState(false)
  // useEffect(() => {
  //   setImageUrl(imageSrc)
  // }, [src])

  const handleImageError = () => {
    setImageUrl(pizza)
  }

  const handleImageLoaded = () => {
    setImgLoaded(true)
  }
  return (
    <>
      {imgLoaded ?
        <img src={imageSrc} style={{pointerEvents: 'none', ...style}} onError={handleImageError} alt={`Зображення продукту`} />
        :
        <div style={{width: '100%', height: '100%'}}>
          {/* <Skeleton width={240} height={240} /> */}
          <img style={{pointerEvents: 'none', ...style}} src={pizza} alt={`Зображення продукту`} />
          <img
            src={imageSrc}
            style={{ visibility: 'hidden', position: 'absolute', width: 10 }}
            onLoad={handleImageLoaded}
            alt={`Зображення продукту`}
          />
        </div>
      }
    </>
  )
}

export default MyImage