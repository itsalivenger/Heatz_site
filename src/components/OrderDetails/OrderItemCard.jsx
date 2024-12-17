import React from 'react';
import styles from './OrderItemCard.module.css';

export const OrderItemCard = ({ item }) => {
  return (
    <div className={styles.itemCard}>
      <div className={styles.imageContainer}>
        <img src={item.imageUrl} alt={item.name} className={styles.image} />
      </div>
      <div className={styles.details}>
        <h3 className={styles.name}>{item.productName}</h3>
        <p className={styles.price}>{item.price.toFixed(2)} DH</p>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.quantity}>Quantité: {item.quantity}</p>
      </div>
    </div>
  );
};
