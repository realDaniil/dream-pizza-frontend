import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import cl from './Gallery.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import img1 from '../../../img/gallery/img1.jpg'
import img2 from '../../../img/gallery/img2.jpg'
import img3 from '../../../img/gallery/img3.jpg'
import img4 from '../../../img/gallery/img4.jpg'
import img5 from '../../../img/gallery/img5.jpg'
import img6 from '../../../img/gallery/img6.jpg'

const imgArr = [img1, img2, img3, img4, img5, img6]

const Gallery = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>Фотогалерея</h2>
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