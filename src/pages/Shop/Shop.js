import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/productCard/productCard';
import ShopHero from '../../components/shopHero/shopHero';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';
import Popup from '../../components/popup/popup';
import Gallery from '../../components/imagesCarousel/Gallery';
import CategoriesSection from './CategoriesSection';
import sendRequest from '../../components/other/sendRequest';
import { serverDomain } from '../../components/other/variables';
import { getUser } from '../../components/other/usefulFunctions';
import styles from './Shop.module.css';

const DEFAULT_CATEGORY = 'earphones';
const LOAD_LIMIT = 24;

const images = [
  { src: './images/other/img1.jpeg' },
  { src: './images/other/img2.png' },
  { src: './images/other/img3.jpeg' },
  { src: './images/other/img5.png' },
  { src: './images/other/img6.png' },
  { src: './images/other/img7.jpeg' },
];

function Shop() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const userRef = useRef(getUser());
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category') || DEFAULT_CATEGORY;

  const fetchProducts = useCallback(async (category, append = false) => {
    setIsLoading(true);
  
    try {
      const start = append ? products.length : 0;
      const response = await sendRequest(
        `${serverDomain}/shop?category=${category}&start=${start}&limit=${LOAD_LIMIT}`,
        'GET'
      );
  
      if (!response.error) {
        setProducts(prev => (append ? [...prev, ...response.products] : response.products));
        setHasMore(response.products.length === LOAD_LIMIT);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  
    setIsLoading(false);
  }, [products.length]);
  
  useEffect(() => {
    fetchProducts(categoryFromUrl);
  }, [categoryFromUrl, fetchProducts]);

  // Ensure Material Icons are loaded for shop page
  useEffect(() => {
    const ensureMaterialIcons = () => {
      if (!document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,100,0,0';
        document.head.appendChild(link);
      }
    };
    
    // Ensure icons are loaded when shop page loads
    ensureMaterialIcons();
    
    // Also check after a short delay to ensure they're applied
    const timer = setTimeout(ensureMaterialIcons, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCategories = (category) => {
    if (category !== categoryFromUrl) {
      navigate(`?category=${category}`, { replace: true });
    }
  };

  const togglePopup = (content) => {
    setIsPopupOpen(true);
    setPopupContent(content);
  };

  return (
    <div className={styles.container}>
      <ShopHero category={categoryFromUrl} />
      <CategoriesSection handleCategories={handleCategories} />

      <div className={styles.titleContainer}>
        <h2>{categoryFromUrl} Pour Vous!</h2>
      </div>

      <div className={styles.productContainer}>
        {isLoading ? (
          <LoadingSpinner />
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard
              togglePopup={togglePopup}
              user_id={userRef.current}
              key={product.id || index}
              product={product}
            />
          ))
        ) : (
          <p className={styles.noProducts}>Aucun produit disponible.</p>
        )}
      </div>


      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            onClick={() => fetchProducts(categoryFromUrl, true)}
            className={styles.loadMore}
            disabled={isLoading}
          >
            <span className="material-symbols-outlined">autorenew</span>
            {isLoading ? 'Chargement...' : 'Charger plus'}
          </button>
        </div>
      )}

      <Gallery images={images} />

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={popupContent.title}
        content={popupContent.content}
      />
    </div>
  );
}

export default Shop;
