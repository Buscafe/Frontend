import React, { useState } from 'react';
import { CarouselData } from './Data/CarouselData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { StylesCarousel } from './StyledComponents/Carousel.js'

//Depedências = yarn add react-icons

export default function Carousel({ slides }){
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  return (
    <StylesCarousel>
      <section className='slider'>
        <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
        <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
        {CarouselData.map((slide, index) => {
          return (
            <div
              className={index === current ? 'slide active' : 'slide'}
              key={index}
            >
              {index === current && (
                <video controls>
                    <source src={slide.video} type="video/mp4" className='videos'/>
                    Seu Navegador não suporta esse tipo de video!
                </video>
              )}
            </div>
          );
        })}
      </section>
    </StylesCarousel>  
  )  
}