import styles from './AboutFeatures.module.css';

export default function AboutFeatures() {
  const features = [
    {
      name: 'Qualité Premium',
      description: 'Chaque produit est fabriqué avec précision et testé rigoureusement pour garantir les plus hauts standards de qualité.',
      icon: 'security',
    },
    {
      name: 'Solutions de Charge Rapide',
      description: 'Technologie de charge de pointe qui alimente vos appareils plus rapidement et en toute sécurité.',
      icon: 'bolt',
    },
    {
      name: 'Autonomie Prolongée',
      description: 'Technologie de batterie avancée garantissant une alimentation plus longue de vos appareils.',
      icon: 'battery_horiz_075',
    },
    {
      name: 'Emballage Écologique',
      description: 'Engagés dans le développement durable avec des emballages recyclables et minimalistes.',
      icon: 'package_2',
    },
  ];

  return (
    <div className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.subtitle}>Pourquoi Choisir Heatz</h2>
          <p className={styles.title}>
            Tout ce dont vous avez besoin en accessoires électroniques
          </p>
          <p className={styles.description}>
            Nous combinons innovation et fiabilité pour offrir des accessoires qui améliorent votre expérience numérique.
          </p>
        </div>
        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.name} className={styles.feature}>
              <dt className={styles.featureTitle}>
                <span className="material-symbols-outlined">{feature.icon}</span>
                {feature.name}
              </dt>
              <dd className={styles.featureDescription}>{feature.description}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}