import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './PreviewProduct.module.css';

function PreviewProduct() {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80'
  ];

  useEffect(()=>{
    
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  const features = [
    "Qualité sonore exceptionnelle avec technologie de réduction de bruit active",
    "Autonomie de batterie jusqu'à 30 heures",
    "Connexion Bluetooth 5.0 avec portée de 10 mètres",
    "Design ergonomique avec coussinets en mousse à mémoire de forme",
    "Commandes tactiles intuitives",
    "Compatible avec les assistants vocaux",
    "Microphone intégré pour les appels",
    "Pliable pour un transport facile"
  ];

  return (
    <div className={styles["product-container"]}>
      <div className={styles["product-preview"]}>
        <div className={styles["image-carousel"]}>
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index} className={styles["carousel-slide"]}>
                <img className={styles["carousel-image"]} src={image} alt={`Vue ${index + 1} du produit`} />
              </div>
            ))}
          </Slider>
        </div>

        <div className={styles["product-info"]}>
          <h1 className={styles["product-title"]}>Casque Sans Fil Premium XZ-3000</h1>
          <div className={styles["product-price"]}>299,99 DH</div>
          
          <div className={styles["product-description"]}>
            <p className={styles["description-text"]}>
              Découvrez une expérience audio incomparable avec notre casque sans fil haut de gamme. 
              Conçu pour les audiophiles exigeants, ce casque combine un son cristallin, 
              un confort optimal et une autonomie exceptionnelle.
            </p>
          </div>

          <div className={styles["product-features"]}>
            <h2 className={styles["features-title"]}>Caractéristiques Principales</h2>
            <ul className={styles["features-list"]}>
              {features.map((feature, index) => (
                <li key={index} className={styles["feature-item"]}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={styles["product-actions"]}>
            <button className={`${styles["button"]} ${styles["button-cart"]}`}>
              Ajouter au Panier <span className='material-symbols-outlined'>shopping_cart</span>
            </button>
            <button 
              className={`${styles["button"]} ${styles["button-wishlist"]} ${isInWishlist ? styles['button-wishlist--active'] : ''}`}
              onClick={() => setIsInWishlist(!isInWishlist)}
            >
                Ajouter aux favoris <span className='material-symbols-outlined'>favorite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewProduct;