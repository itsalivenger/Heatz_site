import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../productCard/productCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProductCarousel.module.css';

const ProductCarousel = ({ products, itemsToShow = 4 }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: itemsToShow,
    slidesToScroll: 4,
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
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;