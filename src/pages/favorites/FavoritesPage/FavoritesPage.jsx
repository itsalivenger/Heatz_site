import React, { useEffect, useState } from 'react';
import { FavoritesList } from '../FavoritesList/FavoritesList';
import { EmptyState } from '../EmptyState/EmptyState';
import styles from './FavoritesPage.module.css';
import { getFavoriteItems, getUser } from '../../../components/other/usefulFunctions';
import Popup from '../../../components/popup/popup';
import sendRequest from '../../../components/other/sendRequest';
import { serverDomain } from '../../../components/other/variables';

// Mock data - in a real app this would come from an API/database
const mockFavorites = [
  {
    id: 1,
    name: 'Sac à main en cuir',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
    addedAt: '2024-03-15'
  },
  {
    id: 2,
    name: 'Bracelet en or',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400',
    addedAt: '2024-03-14'
  },
  {
    id: 3,
    name: 'Collier en argent',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
    addedAt: '2024-03-13'
  }
];

export default function FavoritesPage() {
  const [items, setItems] = useState([]);
  const [user] = useState(getUser());
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({});

  useEffect(() => {
    const getItems = async () => {
      const favoriteItems = await getFavoriteItems();
      setItems(favoriteItems.favorite ? favoriteItems.favorite : []);
    }
    getItems();
  }, [content]);

  const togglePopup = ({title, content}) => {
    setIsOpen(!isOpen);
    setContent({ title, content });
  }

    const removeItemFromFavorite = async (id) => {
      const response = await sendRequest(`${serverDomain}/favorite/delete`, 'POST', { user_id: user._id, product_Id: id });
  
      if (!response.error) {
        togglePopup({ title: 'Success', content: response.message });
      } else {
        togglePopup({ title: 'Error', content: response.error });
      }
    }
  const hasFavorites = items.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <i className={`${styles.icon} material-symbols-outlined`}>favorite</i>
            Mes Favoris
          </h1>
          <p className={styles.subtitle}>
            {hasFavorites
              ? `${items.length} articles enregistrés`
              : 'Aucun article enregistré'}
          </p>
        </header>

        {hasFavorites ? (
          <FavoritesList removeItemFromFavorite={removeItemFromFavorite} user={user} togglePopup={togglePopup} items={items} />
        ) : (
          <EmptyState />
        )}
      </div>
      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} title={content.title} content={content.content} />
    </div>
  );
}