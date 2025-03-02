import { useEffect, useState } from "react";
import styles from "./cart.module.css";
import {
  getCart,
  getTotal,
  updateCartInServer,
  getUser,
} from "../../components/other/usefulFunctions";
import LazyMedia from "../../components/lazyMedia/LazyMedia";

function Cart({ cart, setCart }) {
  const [total, setTotal] = useState(0);

  // Load cart on mount and update total
  useEffect(() => {
    const fetchCart = async () => {
      const { cart: fetchedCart = [] } = await getCart();
      setCart(fetchedCart);
      setTotal(getTotal(fetchedCart));
    };
    fetchCart();
  }, []);

  // Update cart and total
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    setTotal(getTotal(updatedCart));
    saveCart(updatedCart);
  };

  // Save to local storage or server
  const saveCart = (updatedCart) => {
    const user = getUser();
    user._id ? updateCartInServer(updatedCart) : localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <div className={styles["cart-container"]}>
        <div className={styles["order-summary"]}>
          <div className={styles["summary-header"]}>
            <h2>Résumé de la Commande</h2>
            <p>
              Vérifiez votre article et sélectionnez votre méthode d'expédition
              pour une meilleure expérience de commande.
            </p>
          </div>

          <div className={styles["cart-items"]}>
            {cart.length ? (
              cart.map((product) => (
                <ProductInCart key={product._id} product={product} updateCart={updateCart} cart={cart} />
              ))
            ) : (
              <p className={styles["empty-cart"]}>Votre panier est vide</p>
            )}
          </div>
        </div>

        <div className={styles["shipping-address"]}>
          <h3>Adresse de Livraison</h3>
          <p>Aucune adresse trouvée.</p>
          <p className={styles["add-address"]}>Veuillez ajouter une adresse de livraison dans la prochaine page.</p>
        </div>
      </div>

      <div className={styles["total-section"]}>
        <span className={styles["total-price"]}>Total : {total} DH</span>
        <button onClick={() => updateCart([])} className={styles["clear-cart"]}>
          <i className="material-symbols-outlined">delete</i> Vider le Panier
        </button>
      </div>
    </div>
  );
}

function ProductInCart({ product, updateCart, cart }) {
  const { _id, productName, price, quantity, imageUrls } = product;

  const updateQuantity = (change) => {
    const updatedCart = cart.map((item) =>
      item._id === _id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    updateCart(updatedCart);
  };

  return (
    <div className={styles["cart-item"]}>
      <LazyMedia type="image" alt="product" className={styles["cart-image"]} src={imageUrls[0]} />
      <div className={styles["item-details"]}>
        <span className={styles["item-title"]}>{productName}</span>
        <span className={styles["item-price"]}>{price} DH</span>
      </div>
      <div className={styles["item-actions"]}>
        <button className={styles["delete-btn"]} onClick={() => updateCart(cart.filter((item) => item._id !== _id))}>
          <i className="material-symbols-outlined">delete</i>
        </button>
        <div className={styles["quantity-controls"]}>
          <button onClick={() => updateQuantity(-1)}>-</button>
          <input type="number" value={quantity} readOnly />
          <button onClick={() => updateQuantity(1)}>+</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
