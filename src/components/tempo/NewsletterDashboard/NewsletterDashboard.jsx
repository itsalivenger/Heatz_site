import React, { useState } from 'react';
import { Card } from '../ui/Card/Card';
import { Icon } from '../ui/Icon/Icon';
import { SubscriberCount } from '../subscribers/SubscriberCount/SubscriberCount';
import { SubscriberList } from '../subscribers/SubscriberList/SubscriberList';
import { NewsletterForm } from '../newsletter/NewsletterForm/NewsletterForm';
import styles from './NewsletterDashboard.module.css';

const mockSubscribers = [
  { id: 1, email: 'john@example.com', name: 'John Doe' },
  { id: 2, email: 'jane@example.com', name: 'Jane Smith' },
  { id: 3, email: 'bob@example.com', name: 'Bob Johnson' },
];

export default function NewsletterDashboard() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Newsletter sent successfully!');
    setSubject('');
    setContent('');
    setSending(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <Icon name="mail" style={{ color: 'var(--color-green)' }} />
            Promouvoir vos produits
          </h1>
          <p className={styles.subtitle}>
            Gérez et envoyez des newsletters à vos abonnés
          </p>
        </header>

        <div className={styles.grid}>
          <SubscriberCount count={mockSubscribers.length} />
        </div>

        <Card>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Composer Newsletter
            </h2>
            <NewsletterForm
              subject={subject}
              content={content}
              sending={sending}
              onSubjectChange={setSubject}
              onContentChange={setContent}
              onSubmit={handleSend}
            />
          </div>

          <div className={`${styles.section} ${styles.divider}`}>
            <h3 className={styles.sectionTitle}>
              Liste des abonnés
            </h3>
            <SubscriberList subscribers={mockSubscribers} />
          </div>
        </Card>
      </div>
    </div>
  );
}