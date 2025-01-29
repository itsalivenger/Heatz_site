import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import styles from './heroSection.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyMedia from '../lazyMedia/LazyMedia';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Use provided items
  const items = [
    { type: 'video', src: './videos/heroVid.mp4' },
    { type: 'video', src: './videos/heroVid.mp4' },
    { type: 'video', src: './videos/heroVid.mp4' },
    { type: 'video', src: './videos/heroVid.mp4' },
    { type: 'video', src: './videos/heroVid.mp4' },
  ];

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    beforeChange: (newIndex) => setCurrentSlide(newIndex),
  };

  const handleNavClick = (index) => {
    // Programmatically go to the selected slide using the index
    sliderRef.current.slickGoTo(index);
    setCurrentSlide(index); // Ensure the state matches the selected slide
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Main Carousel */}
      <Slider ref={sliderRef} {...settings}>
        {items.map((item, index) => (
          <div key={index} className={styles.carouselItem}>
            {item.type === 'image' ? (
              <LazyMedia type={'Image'} src={item.src} alt={`carousel-img-${index}`} className={styles.image} />
            ) : (
              <LazyMedia type={'Video'} src={item.src} alt={`carousel-video-${index}`} className={styles.video} />
            )}
          </div>
        ))}
      </Slider>

      {/* Navigation Thumbnails */}
      <div className={styles.navigationContainer}>
        <div className={styles.navigation}>
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => console.log('object')} // Click to navigate
              className={`${styles.navItem} ${currentSlide === index ? styles.active : ''}`}
            >
              {item.type === 'image' ? (
                <LazyMedia type={'Image'} onClick={() => handleNavClick(index)} src={item.src} alt={`nav-thumb-${index}`} className={styles.thumbImage} />
              ) : (
                <LazyMedia type={'Video'} onClick={() => handleNavClick(index)} src={item.src} alt={`nav-thumb-${index}`} className={styles.thumbVideo} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
