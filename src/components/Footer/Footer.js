import { useState } from "react";
import styles from "./Footer.module.css";
import sendRequest from "../../components/other/sendRequest";
import { serverDomain } from "../../components/other/variables";
import Popup from "../../components/popup/popup";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [content, setContent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Email:", email);
        const response = await sendRequest(`${serverDomain}/newsletter`, 'POST', { email });
        if (response.status === 200) {
            console.log('object');
            setContent({
            type: 'success',
            title: 'Success',
            message: 'You have successfully subscribed to our newsletter!'
            });
            setIsOpen(true);
        } else {
            console.log(response.error);
            setContent({
            type: 'error',
            title: 'Error',
            content: response.error
            });
            setIsOpen(true);
        }
    };

    const closePopup = () => {
        setContent(null);
        setIsOpen(false);
    };


    return (
    <footer className={styles["footer-container"]}>
        <div className={styles["footer-content"]}>
            {content && <Popup isOpen={isOpen} onClose={closePopup} title={content.title} content={content.content} setContent={setContent} />}
            <div className={styles["footer-top"]}>
                <div className={styles["footer-brand"]}>
                    <div className={styles["logo"]}><img src="./images/logos/Heatz.png" alt="Logo" /></div>
                    <p className={styles["footer-description"]}>
                    Heatz® is a registered brand, now proudly available in Morocco. Known for its wide variety and high-quality products, Heatz® has made its mark globally, especially in the Middle East and North Africa. Our Moroccan customers can experience innovative Heatz® products designed to enhance every season, from top-tier headphones to the latest tech accessories.
                    </p>
                    <form onSubmit={handleSubmit} className={styles["newsletter-form"]}>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={styles["newsletter-input"]} placeholder="Enter your email" />
                        <button type="submit" className={styles["newsletter-button"]}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"/>
                            </svg>
                        </button>
                        <div className={styles["checkbox-container"]}>
                            <input type="checkbox" id="privacy" />
                            <label htmlFor="privacy">I confirm acceptance of the Privacy Policy and consent to its terms, including the use of cookies.</label>
                        </div>
                    </form>
                </div>

                <div className={styles["footer-column"]}>
                    <h3>Mob Acc</h3>
                    <ul className={styles["footer-links"]}>
                        <li><a href="./">Earphones</a></li>
                        <li><a href="./">Cables</a></li>
                        <li><a href="./">Adapters</a></li>
                        <li><a href="./">Power Bank</a></li>
                        <li><a href="./">Batteries</a></li>
                        <li><a href="./">Car Charger</a></li>
                        <li><a href="./">Holders</a></li>
                        <li><a href="./">Speakers</a></li>
                        <li><a href="./">Smartwatches</a></li>
                    </ul>
                </div>

                <div className={styles["footer-column"]}>
                    <h3>Com Acc</h3>
                    <ul className={styles["footer-links"]}>
                        <li><a href="./">Earphones</a></li>
                        <li><a href="./">Cables</a></li>
                        <li><a href="./">Adapters</a></li>
                        <li><a href="./">Power Bank</a></li>
                        <li><a href="./">Batteries</a></li>
                        <li><a href="./">Car Charger</a></li>
                        <li><a href="./">Holders</a></li>
                        <li><a href="./">Speakers</a></li>
                        <li><a href="./">Smartwatches</a></li>
                    </ul>
                </div>

                <div className={styles["footer-column"]}>
                    <h3>Help</h3>
                    <ul className={styles["footer-links"]}>
                        <li><a href="./">Contact Us</a></li>
                        <li><a href="./">FAQs</a></li>
                        <li><a href="./">Shipping & Returns</a></li>
                        <li><a href="./">Payment Methods</a></li>
                        <li><a href="./">Track Your Order</a></li>
                        <li><a href="./">About Us</a></li>
                        <li><a href="./">Delivery Policy</a></li>
                        <li><a href="./">Cancellation Policy</a></li>
                        <li><a href="./">Return Policy</a></li>
                        <li><a href="./">Privacy Policy</a></li>
                        <li><a href="./">Terms and Conditions</a></li>
                    </ul>
                </div>
            </div>

            <div className={styles["footer-bottom"]}>
                <p>Copyright © {currentYear} Heatz - All rights reserved.</p>
            </div>
        </div>
    </footer>
    );
};

export default Footer;
