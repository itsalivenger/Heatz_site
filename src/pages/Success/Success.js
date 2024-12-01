import { useEffect, useState } from 'react';
import styles from './Success.module.css';
import { getUser } from '../../components/other/usefulFunctions';
import { Link } from 'react-router-dom';

function Success() {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(getUser());
    }, []);
    return (
        <div className={styles.success}>
            <div className={styles.container}>
                <section className={styles.orderConfirmation}>
                    <div className={styles.confirmationIcon}>
                        <span className="material-symbols-outlined">check_circle</span>
                    </div>
                    <div className={styles.logo}>
                        <img src="company-logo.svg" alt="Company Logo" />
                    </div>
                    <h1 className={styles.title}>Félicitations</h1>
                    <h2 className={styles.subtitle}>Votre commande est confirmée</h2>
                    <p className={styles.message}>Nous vous enverrons un e-mail de confirmation d'expédition.</p>
                    <div className={styles.actions}>
                        <Link to="/" className={styles.btn}>Retourner à l'accueil</Link>
                        <Link to="/boutique" className={styles.btn}>Explorer plus de produits</Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Success;