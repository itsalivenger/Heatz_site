import React, { useEffect, useState } from 'react';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { OrderHistory } from '../OrderHistory/OrderHistory';
import styles from './ProfilePage.module.css';
import { getUser } from '../../../components/other/usefulFunctions';
import sendRequest from '../../../components/other/sendRequest';
import { serverDomain } from '../../../components/other/variables';

const mockOrders = [
  {
    id: 1,
    number: '2024-001',
    date: '15 Mars 2024',
    total: 149.99,
    items: [
      {
        id: 1,
        name: 'Sac à main en cuir',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200'
      },
      {
        id: 2,
        name: 'Bracelet en or',
        image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200'
      }
    ]
  },
  {
    id: 2,
    number: '2024-002',
    date: '28 Février 2024',
    total: 89.99,
    items: [
      {
        id: 3,
        name: 'Collier en argent',
        image: './images/icons/user.png'
      }
    ]
  }
];

export default function ProfilePage({ handleLogout }) {
  const [orders, setOrders] = useState([]);
  const user = getUser();

  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        const response = await sendRequest(`${serverDomain}/orders/user/${user._id}`, 'GET');
        if (response.error) {
          console.log(response.error);
        } else {
          console.log(response);
          setOrders(response.orders || []);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getOrderHistory();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <ProfileCard handleLogout={handleLogout} user={user} />
          <OrderHistory user={user} orders={orders} />
        </div>
      </div>
    </div>
  );
}