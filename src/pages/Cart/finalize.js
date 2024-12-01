import { getCart, getTotal, getUser } from "../../components/other/usefulFunctions";
import styles from "./finalize.module.css";
import { useEffect, useState } from "react";

function Finalize({ handleSubmit, cart }) {
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState(getUser());


    useEffect(() => {
        // Assuming `getCart` fetches data from local storage or API
        setTotal(getTotal(cart || []));
        setUser(getUser());
        console.log(user);
    }, []);
    return (
        <div className={styles["finalize"]}>
            <span className={styles["finalize-title"]}>Finaliser la Commande</span>
            <span className={styles["finalize-sub-title"]}>Récapitulatif de Commande</span>

            <div className={styles["order-summary"]}>
                <h1>Order Summary</h1>
                {cart && cart.map((item, index) => (
                    <div className={styles["order-summary-item"]} key={index}>
                        <span className={styles["order-summary-item-label"]}>{item.productName} ({item.quantity})</span>
                        <span>{item.price} DH</span>
                    </div>
                ))}
                <div className={styles["order-summary-total"]}>Total: {total} DH</div>
            </div>

            <div className={styles["delivery-info"]}>
                <h1>Delivery Information</h1>
                <div className={styles["info-item"]}>
                    <span className={styles["labelAdress"]}>Address:</span> {user.formData.address}
                </div>
                <div className={styles["info-item"]}>
                    <span className={styles["labelAdress"]}>Phone:</span> {user.formData.phone}
                </div>
                <div className={styles["info-item"]}>
                    <span className={styles["labelAdress"]}>Email:</span> {user.email}
                </div>
                <div className={styles["info-item"]}>
                    <span className={styles["labelAdress"]}>Payment Method:</span> Cash On Delivery
                </div>
            </div>

            <div className={styles["confirmation-container"]}>
                <span className={styles["confirmation-title"]}>Confirmation</span>
                <div className={styles["check-container"]}>
                    <div className={styles["check-input"]}></div>
                    <span className={styles["accept-conditions"]}>J'accepte les <a className={styles["condition-and-terms"]} href="#">conditions générales</a>.</span>
                </div>
            </div>

            <button onClick={handleSubmit} className={styles["confirmation-button"]}>Confirmer la Commande</button>
        </div>
    );
}

export default Finalize;