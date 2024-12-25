import styles from './AboutStats.module.css';

export default function AboutStats() {
  const stats = [
    { id: 1, name: 'Produits Vendus', value: '50K+' },
    { id: 2, name: 'Clients Satisfaits', value: '30K+' },
    { id: 3, name: 'Pays Desservis', value: '25+' },
    { id: 4, name: 'Catégories de Produits', value: '100+' },
  ];

  return (
    <div className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat) => (
            <div key={stat.id} className={styles.stat}>
              <dt className={styles.label}>{stat.name}</dt>
              <dd className={styles.value}>{stat.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}