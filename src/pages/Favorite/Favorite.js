import { useEffect, useState } from 'react';
import styles from './Favorite.module.css';
import { getFavoriteItems } from '../../components/other/usefulFunctions';


function Favorite() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const favoriteItems = await getFavoriteItems();
            setItems(favoriteItems.favorite ? favoriteItems.favorite : []);
            console.log(favoriteItems);
        }
        getItems();
    }, []);
    return (
        <div className={styles['favorite-container']}>
            <span className={styles['favorite-title']}>FAVORIS</span>
            <div className={styles['favorite-items-container']}>
                {items.length ? items.map((item, index) => (
                    <Item key={index} item={item} />
                )) : <div>
                    Your favorite items are empty.
                </div>}
            </div>
            {items.length ? <button className={styles['load-more']}>Voir Plus</button> : ''}
        </div>
    );
}


function Item({ item }) {
    return (
        <div className={styles['favorite-item']}>
            <img alt={item.productName} className={styles['favorite-item-image']} src="./images/products/item1.jpg" />
            <div className={styles['favorite-text-container']}>
                <div className={styles['favorite-text-content']}>
                    <div>
                        <span className={styles['favorite-sub-title']}>{item.productName}</span>
                        <span className={styles['favorite-rarety']}>Popular</span>
                    </div>
                    <span className={styles['favorite-description']}>{item.description}</span>
                </div>
                <div className={styles['favorite-icon-price']}>
                    <i className={`${styles['favorite-icon']} fa fa-heart`}></i>
                    <span className={styles['favorite-price']}>{item.price} DH</span>
                </div>
            </div>
            <div className={styles['stars-container']}>
                <i className={`${styles['star-icon']} fa fa-star`}></i>
                <i className={`${styles['star-icon']} fa fa-star`}></i>
                <i className={`${styles['star-icon']} fa fa-star`}></i>
                <i className={`${styles['star-icon']} fa fa-star`}></i>
                <i className={`${styles['star-icon']} fa fa-star`}></i>
            </div>
            <button className={styles['favorite-add-to-cart']}>Add to cart</button>
        </div>
    );
}

export default Favorite;
