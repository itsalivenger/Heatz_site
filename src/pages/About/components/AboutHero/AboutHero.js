import LazyMedia from '../../../../components/lazyMedia/LazyMedia';
import styles from './AboutHero.module.css';

export default function AboutHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span>A Propos de</span>
          <LazyMedia type={'image'} src={'./images/logos/HeatzLogo.png'} alt="logo" />
        </div>
        <p>
          Alimentez votre style de vie numérique avec des accessoires électroniques haut de gamme. 
          Chez Heatz, nous croyons en l'excellence à travers l'innovation et la qualité.
        </p>
      </div>
    </div>
  );
}