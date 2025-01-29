import { useEffect, useState } from 'react';
import styles from './cart.module.css';
import { getCart, getTotal, updateCartInServer } from '../../components/other/usefulFunctions';
import LazyMedia from '../../components/lazyMedia/LazyMedia';

function Cart({ cart, setCart }) {
    const [total, setTotal] = useState(0);

    // Load cart data on component mount
    useEffect(() => {
        // Assuming `getCart` fetches data from local storage or API
        const handleLoadCart = async () => {
            const cartData = await getCart();
            setCart(cartData.cart || []);
            updateTotal(cartData.cart || []);
        }
        handleLoadCart();
    }, []);

    // Function to update total price
    const updateTotal = (updatedCart) => {
        const totalAmount = getTotal(updatedCart);
        setTotal(totalAmount);
    };

    // Function to handle quantity change
    const handleQuantityChange = (productId, change) => {
        const updatedCart = cart.map((item) => {
            if (item._id === productId) {
                const newQuantity = item.quantity + change;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }; // Ensure quantity is at least 1
            }
            return item;
        });

        setCart(updatedCart);
        updateTotal(updatedCart);
        updateCartInServer(updatedCart);
    };

    // Function to remove item from cart
    const handleRemoveItem = (productId) => {
        const updatedCart = cart.filter((item) => item._id !== productId);
        setCart(updatedCart);
        updateTotal(updatedCart);
        updateCartInServer(updatedCart);
    };

    const handleClearCart = () => {
        setCart([]); // Clear the cart
        updateTotal([]); // Update the total to 0
        updateCartInServer([]);
    };

    return (
        <div>
            <div className={styles["sub-container-of-all"]}>
                <div className={styles["order-summary-container"]}>
                    <div className={styles["order-summary-text-content"]}>
                        <span className={styles["order-summary-title"]}>Résumé de la Commande</span>
                        <span className={styles["order-summary-sub-title"]}>
                            Vérifiez votre article et sélectionnez votre méthode d'expédition pour une meilleure expérience de commande.
                        </span>
                    </div>

                    <div className={styles["order-summary-items-container"]}>
                        {cart.length > 0 ? (
                            cart.map((product, index) => (
                                <ProductInCart
                                    key={index}
                                    product={product}
                                    onQuantityChange={handleQuantityChange}
                                    onRemoveItem={handleRemoveItem}
                                />
                            ))
                        ) : (
                            <div className={styles["order-summary-empty"]}>Votre panier est vide</div>
                        )}
                    </div>
                </div>

                <div className={styles["shipping-address-container"]}>
                    <span className={styles["address-title"]}>Adresse de Livraison</span>
                    <div className={styles["address-type-container"]}>
                        <div className={styles["no-address-container"]}>
                            Aucune adresse trouvée. <div className={styles["add-address"]}>
                                Veuillez
                                ajouter une adresse de livraison dans la prochaine page.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className={styles["total-and-buttons-container"]}>
                <div className={styles["total-container"]}>
                    <span className={styles["total-title"]}>Total :</span>
                    <span className={styles["total-amount"]}>{total} DH</span>
                </div>
                <button onClick={handleClearCart} className={styles["vider-panier-btn"]}>
                    <i className={"material-symbols-outlined"}></i> Vider le Panier
                </button>

            </div>
        </div>
    );
}

function ProductInCart({ product, onQuantityChange, onRemoveItem }) {
    const { _id, productName, price, quantity, imageUrls } = product;
    return (
        <div className={styles["order-summary-item"]}>
            <div className={styles["order-summary-image-container"]}>
                <LazyMedia alt="product display" className={styles["order-summary-image"]} src={imageUrls[0]} />
            </div>
            <div className={styles["order-summary-item-details"]}>
                <div className={styles["order-summary-item-text-content"]}>
                    <span className={styles["order-summary-item-title"]}>{productName}</span>
                    <span className={styles["order-summary-price"]}>{price} DH</span>
                </div>
                <div className={styles["order-summary-control"]}>
                    <button className={styles["trash"]} onClick={() => onRemoveItem(_id)}><i className="material-symbols-outlined">delete</i></button>
                    <div className={styles["quantity-container"]}>
                        <button className={styles["minus"]} onClick={() => onQuantityChange(_id, -1)}>-</button>
                        <input className={styles["order-summary-quantity"]} type="number" value={quantity} readOnly />
                        <button className={styles["plus"]} onClick={() => onQuantityChange(_id, 1)}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
