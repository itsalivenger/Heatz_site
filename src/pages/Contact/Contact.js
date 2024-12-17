import styles from './Contact.module.css';
import Location from '../../components/location/location';
import { useState } from 'react';
import sendRequest from '../../components/other/sendRequest';
import { serverDomain } from '../../components/other/variables';
import Popup from '../../components/popup/popup';
import SocialMedia from '../../components/socialMedia/socialMedia';

function Contact({ contactInfo }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [content, setContent] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, subject, phone, message);
        const contact = { name, email, subject, phone, message };
        const response = await sendRequest(`${serverDomain}/contact`, 'POST', contact);
        console.log(response);
        if (response.status === 200) {
            setContent({
                title: "Success",
                content: "Votre e-mail de contact a bien eté envoyé."
            });
            openPopup();
        } else {
            setContent({
                title: "Error",
                content: response.error
            });
            openPopup();
        }


        resetInputs();
    }

    function resetInputs() {
        setName('');
        setEmail('');
        setSubject('');
        setPhone('');
        setMessage('');
    }


    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className={styles.container}>
            {content && <Popup title={content.title} content={content.content} isOpen={isPopupOpen} onClose={closePopup} />}
            <div className={styles["container-of-all"]}>
                <div className={styles["feel-free-container"]}>
                    <span className={styles["send-us-email"]}>Envoyez-nous un email</span>
                    <span className={styles["feel-free-to-write"]}>N'hésitez pas à nous écrire</span>
                    <div className={styles["input-container"]}>
                        <input value={name} onChange={(e) => setName(e.target.value)} className={styles["info-input"]} type="text" placeholder="Entrez votre nom" required />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className={styles["info-input"]} type="email" placeholder="Entrez votre e-mail" required />
                    </div>
                    <div className={styles["input-container"]}>
                        <input value={subject} onChange={(e) => setSubject(e.target.value)} className={styles["info-input"]} type="text" placeholder="Entrez le sujet" required />
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className={styles["info-input"]} type="number" placeholder="Entrez votre téléphone" required />
                    </div>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} className={`${styles["info-input"]} ${styles["message-input"]}`} placeholder="Entrez votre message"></textarea>
                    <div className={styles["feel-free-buttons-container"]}>
                        <button onClick={handleSubmit} className={styles["send-btn"]}>ENVOYER LE MESSAGE</button>
                        <button onClick={resetInputs} className={styles["reset-btn"]}>RÉINITIALISER</button>
                    </div>
                </div>
                <div className={styles["get-in-touch-container"]}>
                    <span className={styles["need-any-help"]}>Besoin d'aide ?</span>
                    <span className={styles["get-in-touch-with-us"]}>Contactez-nous</span>
                    <SocialMedia />
                    <p className={styles["get-in-touch-paragraph"]}>
                        Lorem ipsum est un texte simplement disponible dolor sit amet,
                        consectetur noté adipisicing elit sed do eiusmod tempor
                        incididunt simplement dolore magna aliqua.
                    </p>
                    <div className={styles["media-container"]}>
                        <i className={`${styles["media-icons"]} material-symbols-outlined`}>call</i>
                        <div className={styles["media-text-container"]}>
                            <span className={styles["get-in-touch-span0"]}>Avez-vous des questions ?</span>
                            <span className={styles["get-in-touch-span1"]}>Appel gratuit : {contactInfo.phoneNumber}</span>
                        </div>
                    </div>
                    <div className={styles["media-container"]}>
                        <i className={`${styles["media-icons"]} material-symbols-outlined`}>mail</i>
                        <div className={styles["media-text-container"]}>
                            <span className={styles["get-in-touch-span0"]}>Écrivez-nous un e-mail</span>
                            <span className={styles["get-in-touch-span1"]}>{contactInfo.email}</span>
                        </div>
                    </div>
                    <div className={styles["media-container"]}>
                        <i className={`${styles["media-icons"]} material-symbols-outlined`}>location_on</i>
                        <div className={styles["media-text-container"]}>
                            <span className={styles["get-in-touch-span0"]}>Visitez-nous à tout moment</span>
                            <span className={styles["get-in-touch-span1"]}>{contactInfo.address}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Location />
        </div>
    );
    
}

export default Contact;