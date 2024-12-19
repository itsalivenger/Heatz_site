import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../productCard/productCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProductCarousel.module.css';

const ProductCarousel = ({ products, itemsToShow = 3, togglePopup }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 6000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: itemsToShow,
    slidesToScroll: 1,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(itemsToShow, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(itemsToShow, 2),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.productCarousel}>
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index} className={styles.carouselItem}>
            <div className={styles.carouselItemInner}>
              <ProductCard product={product} togglePopup={togglePopup} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;