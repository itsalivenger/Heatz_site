import React from 'react';
import { Card } from '../../ui/Card/Card';
import { Icon } from '../../ui/Icon/Icon';
import styles from './SubscriberCount.module.css';

export function SubscriberCount({ count }) {
  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <Icon name="group" className={styles.icon} />
        <h2 className={styles.title}>Abonnés</h2>
      </div>
      <p className={styles.count}>{count}</p>
    </Card>
  );
}