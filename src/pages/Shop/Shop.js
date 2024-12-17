import ProductCard from '../../components/productCard/productCard';
import styles from './Shop.module.css';
import ShopHero from '../../components/shopHero/shopHero';
import { useEffect, useState } from 'react';
import sendRequest from '../../components/other/sendRequest';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';
import { serverDomain } from '../../components/other/variables';
import { getUser } from '../../components/other/usefulFunctions';
import Popup from '../../components/popup/popup';
import Gallery from '../../components/imagesCarousel/Gallery';
import CategoriesSection from './CategoriesSection';

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
    const [user] = useState({user_id: getUser()._id});
    const [startIndex, setStartIndex] = useState(0);  // Keep track of the current index
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState({});
    const loadLimit = 5;  // Match this with backend's loadLimit

    useEffect(() => {
        async function getProducts() {
            try {
                // Include the current index in the URL query parameter
                const response = await sendRequest(`${serverDomain}/shop?n=${startIndex}?category=earphones`, 'GET');

                if (response.error) {
                    console.log(response.error);
                } else {
                    // console.log(response);
                    // Append new products to the existing list
                    setProducts(response.products);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        getProducts();
    }, [startIndex]);

    // Function to load more products
    const loadMoreProducts = () => {
        setStartIndex(prevIndex => prevIndex + loadLimit);  // Increment the start index
    };

    function togglePopup(content) {
        setIsOpen(true);
        setContent(content);
    }

    const handleCategories = async (category) => {
        const response = await sendRequest(`${serverDomain}/shop?category=${category}`, 'GET');
        // const prods = response.products;
        if (response.error) {
            console.log(response.error);
        } else {
            // Append new products to the existing list
            setProducts(response.products);
        }
    }

    return (
        <div>
            <div className={styles.container}>
                {/* hna ghaykun first section */}
                <ShopHero />
                <CategoriesSection handleCategories={handleCategories} />

                <div className={styles.titleContainer}>
                    <h2>Headphones for you!</h2>
                </div>

                <div className={styles.productContainer}>
                    {products ? products.map((product, index) => {
                        return <ProductCard togglePopup={togglePopup} user_id={user ? user.user_id : ''} key={index} product={product} />
                    }) : <LoadingSpinner />}
                </div>

                <div className={styles.loadMoreContainer}>
                    <button onClick={loadMoreProducts} className={styles["loadMore"]}>
                        <span className="material-symbols-outlined">autorenew</span>
                        Load more...
                    </button>
                </div>
            </div>
            <Gallery images={images} />
            <Popup isOpen={isOpen} onClose={()=> setIsOpen(false)} title={content.title} content={content.content} />
        </div>
    );
}

export default Shop;