import { FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn } from 'react-icons/fa';
import styles from './socialMedia.module.css';
import { Link } from "react-router-dom";

function SocialMedia() {
    return (
        <div className={styles.iconContainer}>
            <Link target="_blank" to={'https://facebook.com/61565272588880'} className={`icon ${styles.icon}`}> 
                <div className={styles.iconBg}>
                  <FaFacebookF color="#fff" size={22} />
                </div>
            </Link>
            <Link target="_blank" to={'https://www.instagram.com/heatz.ma/profilecard/?igsh=MTQweW1rdWozNTlmbg=='} className={`icon ${styles.icon}`}> 
                <div className={styles.iconBg}>
                  <FaInstagram color="#fff" size={22} />
                </div>
            </Link>
            <Link target="_blank" to={'https://www.tiktok.com/@heatz.ma?_t=8s3diEAAVlN&_r=1'} className={`icon ${styles.icon}`}> 
                <div className={styles.iconBg}>
                  <FaTiktok color="#fff" size={22} />
                </div>
            </Link>
            <Link target="_blank" to={'https://www.youtube.com/channel/UCQ5zQ7QyQG2O5c4z3Y0zQ7Q'} className={`icon ${styles.icon}`}> 
                <div className={styles.iconBg}>
                  <FaLinkedinIn color="#fff" size={22} />
                </div>
            </Link>
        </div>
    );
}

export default SocialMedia;