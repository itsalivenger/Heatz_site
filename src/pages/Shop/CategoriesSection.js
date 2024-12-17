import { useState } from 'react';
import styles from './CategoriesSection.module.css';

const categories = [
    { name: 'Chargeurs', imgSrc: './images/categories/adaptors.png' },
    { name: 'Batteries', imgSrc: './images/categories/battery.png' },
    { name: 'Câbles', imgSrc: './images/categories/cables.png' },
    { name: 'Écouteurs', imgSrc: './images/categories/earphone.png' },
    { name: 'Modulateur', imgSrc: './images/categories/fm.png' },
    { name: 'Supports', imgSrc: './images/categories/holder.png' },
    { name: 'tablettes', imgSrc: './images/categories/tablette.png' },
    { name: 'Montres', imgSrc: './images/categories/watches.png' },
    { name: 'Powerbank', imgSrc: './images/categories/powerbank.png' },
    { name: 'phone Case', imgSrc: './images/categories/phonecase.png' },
    { name: 'Haut-parleurs', imgSrc: './images/categories/speaker.png' },
    { name: 'Chargeur de voiture', imgSrc: './images/categories/car-charger.png' },
];

function CategoriesSection({ handleCategories }) {
    const [activeCategory, setActiveCategory] = useState(categories[4].name);

    useState(() => {
        handleCategories(activeCategory);
    })
    const handleCategoryClick = (categoryName) => {
        setActiveCategory(categoryName);
        handleCategories(categoryName);
    };

    return (
        <div className={styles.container}>
            {categories.map((category, i) => (
                <div
                    key={category.name}
                    className={`${styles.category} ${(activeCategory === category.name) ? styles.active : ''}`}
                    onClick={() => handleCategoryClick(category.name)}
                >
                    <img src={category.imgSrc} alt={category.name} className={`${styles.icon}`} />
                    <span className={styles.name}>{category.name}</span>
                </div>
            ))}
        </div>
    );
}

export default CategoriesSection;
