import { Link } from 'react-router-dom';
import styles from './homeCategories.module.css';
import LazyMedia from '../lazyMedia/LazyMedia';

const categories = [
    { name: 'Chargeurs', imgSrc: './images/categories/adaptors.png' },
    { name: 'Batteries', imgSrc: './images/categories/battery.png' },
    { name: 'Câbles', imgSrc: './images/categories/cables.png' },
    { name: 'Écouteurs', imgSrc: './images/categories/earphone.png' },
    { name: 'Modulateur', imgSrc: './images/categories/fm.png' },
    { name: 'Supports', imgSrc: './images/categories/holder.png' },
    { name: 'Tablettes', imgSrc: './images/categories/tablette.png' },
    { name: 'Montres', imgSrc: './images/categories/watches.png' },
    { name: 'Powerbank', imgSrc: './images/categories/powerbank.png' },
    { name: 'Phone Case', imgSrc: './images/categories/phoneCase.png' },
    { name: 'Haut-parleurs', imgSrc: './images/categories/speaker.png' },
    { name: 'Chargeur de voiture', imgSrc: './images/categories/car-charger.png' },
];

function HomeCategories() {
    return (
        <div className={styles.container}>
            {categories.map((category, i) => (
                <div
                    key={category.name}
                    className={`${styles.category}`}
                    onClick={() => {window.location.href = `/boutique?category=${category.name}`}}
                >
                    <LazyMedia type={'image'} src={category.imgSrc} alt={category.name} className={`${styles.icon}`} />
                    <span className={styles.name}>{category.name}</span>
                </div>
            ))}
        </div>
    );
}

export default HomeCategories;
