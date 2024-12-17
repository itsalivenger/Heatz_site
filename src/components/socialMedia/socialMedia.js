import styles from './socialMedia.module.css';
import { Link } from "react-router-dom";

function SocialMedia() {
    return (
        <div className={styles.iconContainer}>
            <Link target="_blank" to={'https://facebook.com/61565272588880'} className={`icon ${styles.icon}`}><img src="./images/icons/facebook.png" alt="social media" /></Link>
            <Link target="_blank" to={'https://www.instagram.com/heatz.ma/profilecard/?igsh=MTQweW1rdWozNTlmbg=='} className={`icon ${styles.icon}`}><img src="./images/icons/instagram.png" alt="social media" /></Link>
            <Link target="_blank" to={'https://www.tiktok.com/@heatz.ma?_t=8s3diEAAVlN&_r=1'} className={`icon ${styles.icon}`}><img src="./images/icons/tiktok3.png" alt="social media" /></Link>
        </div>
    );
}

export default SocialMedia;