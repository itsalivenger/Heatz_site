import { useState } from 'react';
import styles from './CategoriesSection.module.css';
import { useLocation } from 'react-router-dom';
import LazyMedia from '../../components/lazyMedia/LazyMedia';

const categories = [
    { name: 'Chargeurs', imgSrc: './images/categories/adaptors.png' },
    { name: 'Câbles', imgSrc: './images/categories/cables.png' },
    { name: 'Écouteurs', imgSrc: './images/categories/earphone.png' },
    { name: 'Haut-parleurs', imgSrc: './images/categories/speaker.png' },
    { name: 'Batteries', imgSrc: './images/categories/battery.png' },
    { name: 'Modulateur', imgSrc: './images/categories/fm.png' },
    { name: 'Supports', imgSrc: './images/categories/holder.png' },
    { name: 'Tablettes', imgSrc: './images/categories/tablette.png' },
    { name: 'Montres', imgSrc: './images/categories/watches.png' },
    { name: 'Powerbank', imgSrc: './images/categories/powerbank.png' },
    { name: 'Phone Case', imgSrc: './images/categories/phoneCase.png' },
    { name: 'Chargeur de voiture', imgSrc: './images/categories/car-charger.png' },
];

function CategoriesSection({ handleCategories }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get('category');
    const [activeCategory, setActiveCategory] = useState(categoryFromUrl ?
        categories.find((category) => category.name === categoryFromUrl).name : categories[0].name
    );

    useState(() => {
        handleCategories(activeCategory);

        // Extract category from URL
        const queryParams = new URLSearchParams(location.search);
        const categoryFromUrl = queryParams.get('category');

        if (categoryFromUrl) {
            // Use setTimeout to defer execution until after rendering
            setTimeout(() => {
                const element = document.getElementById('categories');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    console.warn(`Element with ID "${categoryFromUrl}" not found.`);
                }
            }, 0); // Delay ensures the DOM is fully updated
        }
    }, [])
    const handleCategoryClick = (categoryName) => {
        setActiveCategory(categoryName);
        handleCategories(categoryName);
    };

    return (
        <div className={styles.container} id='categories'>
            {categories.map((category, i) => (
                <div
                    key={i}
                    className={`${styles.category} ${(activeCategory === category.name) ? styles.active : ''}`}
                    onClick={() => handleCategoryClick(category.name)}
                >
                    <LazyMedia type={'image'} src={category.imgSrc} alt={category.name} className={`${styles.icon}`} />
                    <span className={styles.name}>{category.name}</span>
                </div>
            ))}
        </div>
    );
}

export default CategoriesSection;
