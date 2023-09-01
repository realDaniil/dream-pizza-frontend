import React, { useEffect, useState } from 'react'
import pizza from '../../img/pizza.svg'

const MyImage = ({ src, style }) => {
  const [imageSrc, setImageUrl] = useState(process.env.REACT_APP_API_URL + src)
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
        <div>
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