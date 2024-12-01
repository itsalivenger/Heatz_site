import TabNavigation from "./tabNavigation";
import styles from './productsCardsCarousel.module.css';
import ViewAllButton from "./ViewAllButton";


function ProductsCardsCarousel() {
    return (
        <div>
            <div className={styles["navigationContainer"]}>
                <TabNavigation tabs={['Headset', 'Mouse', 'Keyboard', '10% Offers']} />
                <ViewAllButton text="View All" onClick={() => {}} />
            </div>
        </div>
    );
}

export default ProductsCardsCarousel;