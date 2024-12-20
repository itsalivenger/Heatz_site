import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './productCard.module.css';
import sendRequest from '../other/sendRequest';
import { serverDomain } from '../other/variables';

const ProductCard = ({ product, user_id, togglePopup }) => {

  // console.log(product.imageUrl, user_id);
  const isConnected = () => {
    if (!user_id) {
      togglePopup({ title: 'Error', content: 'Vous devez vous connecter d\'abord.' });
      return false;
    } else {
      return true;
    }
  };

  const addToCart = async () => {
    if (!isConnected()) return;

    const response = await sendRequest(`${serverDomain}/cart`, 'POST', { product_Id: product._id, user_id });
    if (!response.error) {
      togglePopup({ title: 'Success', content: response.message });
      const user = JSON.parse(localStorage.getItem('user'));
      user.cart.push({ ...product, quantity: 1 });
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      togglePopup({ title: 'Error', content: response.error });
    }
  };

  const addToFavorite = async () => {
    console.log(user_id);
    if (!isConnected()) return;
    const response = await sendRequest(`${serverDomain}/favorite`, 'POST', { product_Id: product._id, user_id: user_id._id });
    if (!response.error) {
      togglePopup({ title: 'Success', content: response.message });
    } else {
      togglePopup({ title: 'Error', content: response.error });
    }
  };

  // Carousel settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Slider {...settings} className={styles.carousel}>
          {product.imageUrl && product.imageUrl.map((image, index) => (
            <div key={index} className={styles.carouselSlide}>
              <img src={image} alt={`${product.productName} ${index + 1}`} className={styles.productImage} />
            </div>
          ))}
        </Slider>
        <div className={styles.iconsContainer}>
          <span onClick={addToFavorite} className={`material-symbols-outlined ${styles.icon} ${styles.heartIcon}`}>
            favorite
          </span>
          <span onClick={addToCart} className={`material-symbols-outlined ${styles.icon} ${styles.cartIcon}`}>
            shopping_cart
          </span>
        </div>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.title}>{product.productName}</p>
        <p className={styles.note}>{product.note}</p>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>{product.price} DH</p>
      </div>
    </div>
  );
};

export default ProductCard;
