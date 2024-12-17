import React from 'react';
import styles from './OrderSummary.module.css';

const OrderSummary = ({ subtotal, shippingCost, tax, total }) => {
  return (
    <div className={styles.summary}>
      <div className={styles.row}>
        <span>Sous Total:</span>
        <span>{subtotal.toFixed(2)} DH</span>
      </div>
      <div className={styles.row}>
        <span>Livraison</span>
        <span>{shippingCost.toFixed(2)} DH</span>
      </div>
      {/* <div className={styles.row}>
        <span></span>
        <span>${tax.toFixed(2)}</span>
      </div> */}
      <div className={`${styles.row} ${styles.total}`}>
        <span>Total</span>
        <span className={styles.totalAmount}>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;