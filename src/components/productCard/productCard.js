import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './productCard.module.css';
import sendRequest from '../other/sendRequest';
import { serverDomain } from '../other/variables';
import { addToFavorite } from "../other/usefulFunctions";

const ProductCard = ({ product, user_id, togglePopup }) => {

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

  const shortenText = (text, maxLength = 100, suffix = '...') => {
    // Return original text if it's shorter than max length
    if (!text || text.length <= maxLength) {
      return text;
    }

    // Find the last space before maxLength to avoid cutting words
    const lastSpace = text.lastIndexOf(' ', maxLength);

    // If no space found, just cut at maxLength
    if (lastSpace === -1) {
      return text.substring(0, maxLength) + suffix;
    }

    // Cut at the last space and add suffix
    return text.substring(0, lastSpace) + suffix;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    variableWidth: false
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Slider {...settings} className={styles.carousel}>
          {product.imageUrls && product.imageUrls.map((image, index) => (
            <div key={index} className={styles.carouselSlide}>
              <img src={image} alt={`${product.productName} ${index + 1}`} className={styles.productImage} />
            </div>
          ))}
        </Slider>
        <div className={styles.iconsContainer}>
          <span onClick={()=> addToFavorite(product._id, user_id, togglePopup)} className={`material-symbols-outlined ${styles.icon} ${styles.heartIcon}`}>
            favorite
          </span>
          <span onClick={addToCart} className={`material-symbols-outlined ${styles.icon} ${styles.cartIcon}`}>
            shopping_cart
          </span>
        </div>
      </div>
      <div className={styles.cardContent}>
        <a href={`/productPreview?_id=${product._id}`} className={styles.title}>
          {product.productName}
        </a>
        <p className={styles.note}>{product.note}</p>
        <p className={styles.description}>{shortenText(product.description)}</p>
        <p className={styles.price}>{product.price} DH</p>
      </div>
    </div>
  );
};

export default ProductCard;
