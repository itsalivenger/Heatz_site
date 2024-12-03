import styles from './productCard.module.css';
import sendRequest from '../other/sendRequest';
import { serverDomain } from '../other/variables';

const ProductCard = ({ product, user_id, togglePopup }) => {

  const isConntected = () => {
    if (!user_id) {
      togglePopup({ title: 'Error', content: 'Vous devez vous connecter d\'abord.' });
      return false;
    } else {
      return true;
    }
  }

  const addToCart = async () => {
    if (!isConntected()) return;

    const response = await sendRequest(`${serverDomain}/cart`, 'POST', { product_Id: product._id, user_id });
    if (!response.error) {
      togglePopup({ title: 'Success', content: response.message });
      const user = JSON.parse(localStorage.getItem('user'));
      user.cart.push({ ...product, quantity: 1 });
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      togglePopup({ title: 'Error', content: response.error });
    }
  }

  const addToFavorite = async () => {
    if (!isConntected()) return;
    const response = await sendRequest(`${serverDomain}/favorite`, 'POST', { product_Id: product._id, user_id });
    if (!response.error) {
      togglePopup({ title: 'Success', content: response.message });
    } else {
      togglePopup({ title: 'Error', content: response.error });
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.imageUrl} alt={product.productName} className={styles.productImage} />
        <div className={styles.iconsContainer}>
          <span onClick={addToFavorite} className={`material-symbols-outlined ${styles.icon} ${styles.heartIcon}`}>favorite</span>
          <span onClick={addToCart} className={`material-symbols-outlined ${styles.icon} ${styles.cartIcon}`}>shopping_cart</span>
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
