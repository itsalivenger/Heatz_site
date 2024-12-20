import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon/Icon';
import styles from './FavoritesList.module.css';
import { addToCart } from '../../../components/other/usefulFunctions';

export function FavoritesList({ items, togglePopup, user, removeItemFromFavorite }) {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <Card key={index} className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={item.imageUrl} alt={item.productName} className={styles.image} />
            <button className={styles.removeButton}>
              <Icon onClick={() => removeItemFromFavorite(item._id)} name="close" />
            </button>
          </div>
          
          <div className={styles.content}>
            <h3 className={styles.name}>{item.productName}</h3>
            <p className={styles.price}>{item.price} DH</p>
            <p className={styles.date}>
              Ajouté le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
            </p>
            
            <Button handleClick={() => addToCart(user._id , togglePopup, item)} className={styles.addToCartButton}>
              <Icon name="shopping_cart" className={styles.buttonIcon} />
              Ajouter au panier
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}