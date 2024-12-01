import React from 'react';
import Slider from 'react-slick';  // Assuming 'react-slick' is installed
import styles from './videoCarousel.module.css';

const VideoCarousel = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 videos per slide
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 videos on medium screens
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 videos on small screens
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Show 1 video on very small screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  const videos = [
    { src: './videos/crossroad.mp4', title: 'Video 1' },
    { src: './videos/handWatch.mp4', title: 'Video 2' },
    { src: './videos/watch2.mp4', title: 'Video 3' },
    { src: './videos/crossroad.mp4', title: 'Video 4' },
    { src: './videos/handWatch.mp4', title: 'Video 2' },
    { src: './videos/watch2.mp4', title: 'Video 3' },
    { src: './videos/crossroad.mp4', title: 'Video 4' }
  ];

  return (
    <div className={styles['carousel-container']}>
      <Slider {...settings}>
        {videos.map((video, index) => (
          <div key={index} className={styles['video-wrapper']}>
            <video className={styles['carousel-video']}>
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoCarousel;
