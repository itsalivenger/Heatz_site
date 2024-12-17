import React from 'react';
import styles from './OrderStatus.module.css';

const statusConfig = {
  pending: { label: 'En attente' },
  processing: { label: 'En cours de traitement' },
  shipped: { label: 'Expédié' },
  delivered: { label: 'Livré' },
  cancelled: { label: 'Annulé' },
};

export const OrderStatus = ({ status }) => {
  return (
    <div className={`${styles.status} ${styles[status.toLowerCase()]}`}>
      {/* <Icon size={16} /> */}
      <i className='material-symbols-outlined'>more_vert</i>
      <span>{statusConfig[status.toLowerCase()].label}</span>
    </div>
  );
};
