import styles from './Contact.module.css';
import Location from '../../components/location/location';
import { useState, useCallback } from 'react';
import sendRequest from '../../components/other/sendRequest';
import { serverDomain } from '../../components/other/variables';
import Popup from '../../components/popup/popup';
import SocialMedia from '../../components/socialMedia/socialMedia';
import SellerForm from '../../components/contactSocieteForm/contactSocieteForm';

function Contact({ contactInfo, theme }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: ''
    });
    const [content, setContent] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        return formData.name && formData.email.includes('@') && formData.message;
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setContent({ title: "Erreur", content: "Veuillez remplir tous les champs obligatoires." });
            setIsPopupOpen(true);
            return;
        }
        setLoading(true);
        const response = await sendRequest(`${serverDomain}/contact`, 'POST', formData);
        setLoading(false);
        if (response.status === 200) {
            setContent({ title: "Succès", content: "Votre e-mail a bien été envoyé." });
        } else {
            setContent({ title: "Erreur", content: response.error });
        }
        setIsPopupOpen(true);
        setFormData({ name: '', email: '', subject: '', phone: '', message: '' });
    }, [formData]);

    return (
        <div className={styles.container}>
            {content && <Popup title={content.title} content={content.content} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
            <div className={styles["container-of-all"]}>
                <div className={`${styles["feel-free-container"]} ${isFlipped ? styles.flipped : ''}`}>
                    <div className={styles.front}>
                        <span className={styles["send-us-email"]}>Envoyez-nous un email</span>
                        <span className={styles["feel-free-to-write"]}>N'hésitez pas à nous écrire</span>
                        <div className={styles["input-container"]}>
                            <input name="name" value={formData.name} onChange={handleChange} className={styles["info-input"]} type="text" placeholder="Entrez votre nom" required />
                            <input name="email" value={formData.email} onChange={handleChange} className={styles["info-input"]} type="email" placeholder="Entrez votre e-mail" required />
                        </div>
                        <div className={styles["input-container"]}>
                            <input name="subject" value={formData.subject} onChange={handleChange} className={styles["info-input"]} type="text" placeholder="Entrez le sujet" required />
                            <input name="phone" value={formData.phone} onChange={handleChange} className={styles["info-input"]} type="tel" placeholder="Entrez votre téléphone" required />
                        </div>
                        <textarea name="message" value={formData.message} onChange={handleChange} className={`${styles["info-input"]} ${styles["message-input"]}`} placeholder="Entrez votre message"></textarea>
                        <div className={styles["buttonsContainer"]}>
                            <button onClick={handleSubmit} className={styles["submitBtn"]} disabled={loading}>{loading ? "Envoi..." : "Envoyer"}</button>
                            <button onClick={() => setFormData({ name: '', email: '', subject: '', phone: '', message: '' })} className={styles["resetBtn"]}>Réinitialiser</button>
                            <button onClick={() => setIsFlipped(!isFlipped)} className={styles["flipButton"]}>Professionnel</button>
                        </div>
                    </div>
                    <div className={styles.back}>
                        <SellerForm flipCard={() => setIsFlipped(!isFlipped)} />
                    </div>
                </div>
                <GetInTouch theme={theme} contactInfo={contactInfo} />
            </div>
            <Location />
        </div>
    );
}

function GetInTouch({ contactInfo, theme }) {
    return (
        <div className={styles["get-in-touch-container"]}>
            <span className={styles["need-any-help"]}>Besoin d'aide ?</span>
            <span className={styles["get-in-touch-with-us"]}>Contactez-nous</span>
            <SocialMedia />
            <p className={styles["get-in-touch-paragraph"]}>
                Vous avez une question ou besoin d'aide avec l'un de nos produits ? Notre équipe est là pour vous aider. N'hésitez pas à nous contacter via les réseaux sociaux ou par e-mail. Nous nous engageons à répondre rapidement à toutes vos demandes.
            </p>
            <div className={styles["media-container"]} onClick={() => window.open(`tel:${contactInfo.phoneNumber}`, "_self")}>
                <i className={`${styles["media-icons"]} material-symbols-outlined`}>call</i>
                <div className={styles["media-text-container"]}>
                    <span className={styles["get-in-touch-span0"]}>Avez-vous des questions ?</span>
                    <span className={`${theme === 'dark' ? styles.dark : styles.light} ${styles["get-in-touch-span1"]}`}>Appel gratuit : {contactInfo.phoneNumber}</span>
                </div>
            </div>
            <div className={styles["media-container"]} onClick={() => window.open(`mailto:${contactInfo.email}`, "_self")}>
                <i className={`${styles["media-icons"]} material-symbols-outlined`}>mail</i>
                <div className={styles["media-text-container"]}>
                    <span className={styles["get-in-touch-span0"]}>Écrivez-nous un e-mail</span>
                    <span className={`${theme === 'dark' ? styles.dark : styles.light} ${styles["get-in-touch-span1"]}`}>{contactInfo.email}</span>
                </div>
            </div>

            <div
                className={styles["media-container"]}
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`, "_blank")}
            >
                <i className={`${styles["media-icons"]} material-symbols-outlined`}>location_on</i>
                <div className={styles["media-text-container"]}>
                    <span className={styles["get-in-touch-span0"]}>Visitez-nous à tout moment</span>
                    <span className={`${theme === 'dark' ? styles.dark : styles.light} ${styles["get-in-touch-span1"]}`}>{contactInfo.address}</span>
                </div>
            </div>
        </div>
    )
}

export default Contact;