import React from 'react';
import styles from './shippingFeature.module.css';

export function ShippingFeatures() {
    const features = [
        {
            icon: <img src='./images/icons/truck.svg' className={styles.icon} alt='truck' />,
            title: 'Livraison Gratuite',
            description: 'Pour toute commande de plus de 50€'
        },
        {
            icon: <img src='./images/icons/package.svg' className={styles.icon} alt='package' />,
            title: 'Retours Gratuits',
            description: 'Sous 30 jours'
        },
        {
            icon: <img src='./images/icons/clock.svg' className={styles.icon} alt='clock' />,
            title: 'Livraison Express',
            description: 'Sous 24-48h'
        },
        {
            icon: <img src='./images/icons/shield.svg' className={styles.icon} alt='shield' />,
            title: 'Paiement Sécurisé',
            description: 'Par carte ou PayPal'
        }
    ];

    return (
        <div className={styles.container}>
            {features.map((feature, index) => (
                <div key={index} className={styles.feature}>
                    {feature.icon}
                    <h3 className={styles.title}>{feature.title}</h3>
                    <p className={styles.description}>{feature.description}</p>
                </div>
            ))}
        </div>
    );
}