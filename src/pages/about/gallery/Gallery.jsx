import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import cl from './Gallery.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import img1 from '../../../img/gallery/img1.avif'
import img2 from '../../../img/gallery/img2.avif'
import img3 from '../../../img/gallery/img3.avif'
import img4 from '../../../img/gallery/img4.jpg'
import img5 from '../../../img/gallery/img5.avif'
import img6 from '../../../img/gallery/img6.avif'
import { Typography } from '@mui/material';

const imgArr = [img1, img2, img3, img4, img5, img6]

const Gallery = () => {
  return (
    <div>
      <Typography variant='h5' sx={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2, my: 2 }}>Фотогалерея</Typography>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {imgArr.map((img, index) =>
          <SwiperSlide key={index} className={cl.swiperSlide}><img src={img} alt={`Image ${index}`} /></SwiperSlide>)
        }
      </Swiper>
    </div>
  );
};

export default Gallery