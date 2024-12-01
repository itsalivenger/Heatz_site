// Popup.jsx
import { useState, useEffect } from "react";
import styles from "./popup.module.css";
import PropTypes from 'prop-types';

function Popup({ isOpen, onClose, title, content, onConfirm }) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // First show the overlay
            setIsActive(true);
        } else {
            // Hide the popup first, then the overlay
            setIsActive(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsActive(false);
        // Delay the onClose to allow the animation to complete
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        handleClose();
    };

    return (
        <div 
            className={`${styles["popup-overlay"]} ${isOpen ? styles["active"] : ''}`}
            onClick={handleOverlayClick}
        >
            <div className={`${styles["popup"]} ${isActive ? styles["active"] : ''}`}>
                <button 
                    className={styles["close-button"]} 
                    onClick={handleClose}
                >
                    &times;
                </button>
                <div className={styles["popup-header"]}>
                    <h2 className={styles["popup-title"]}>{title || "Welcome!"}</h2>
                </div>
                <div className={styles["popup-content"]}>
                    <p>{content || "This is an animated popup window."}</p>
                </div>
                <div className={styles["popup-actions"]}>
                    <button 
                        onClick={handleClose} 
                        className={`${styles["popup-button"]} ${styles["cancel-button"]}`}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleConfirm} 
                        className={`${styles["popup-button"]} ${styles["confirm-button"]}`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

Popup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.node
};

export default Popup;