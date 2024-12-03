import TabNavigation from "./tabNavigation";
import styles from './productsCardsCarousel.module.css';
import ViewAllButton from "./ViewAllButton";

function ProductsCardsCarousel() {
    return (
        <div>
            <div className={styles["navigationContainer"]}>
                <TabNavigation tabs={['Casque', 'Souris', 'Clavier', 'Offres 10%']} />
                <ViewAllButton text="Voir Tout" onClick={() => {}} />
            </div>
        </div>
    );
}

export default ProductsCardsCarousel;
