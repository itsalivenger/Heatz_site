import { getTotal } from '../../../components/other/usefulFunctions';
import { Card } from '../../../components/tempo/ui/Card/Card';
import styles from './OrderHistory.module.css';

export function OrderHistory({ orders }) {

  console.log(orders);
  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Historique des commandes</h2>
      </div>

      <div className={styles.orderGrid}>
        {orders.length ? orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span className={styles.orderNumber}>Commande #{order._id}</span>
              <span className={styles.orderDate}>{order.createdAt}</span>
            </div>

            <div className={styles.orderItems}>
              {order.cart.map((item, index) => (
                <img
                  key={index}
                  src={item.imageUrl}
                  alt={item.productName}
                  className={styles.itemImage}
                />
              ))}
            </div>

            <div className={styles.orderTotal}>
              Total: {getTotal(order.cart)}€
            </div>
          </div>
        )) : (
          <p className={styles.noOrders}>Aucune commande trouvée.</p>
        )}
      </div>
    </Card>
  );
}