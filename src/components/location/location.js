import styles from './location.module.css';

function Location() {
    return (
        <div>
            <div className={styles["map-container"]}>
                <h2 className={styles["map-title"]}>Our Location</h2>
                <div className={styles["map-wrapper"]}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27131052.384268362!2d82.69987777734175!3d33.8923310923408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31508e64e5c642c1%3A0x951daa7c349f366f!2sChine!5e0!3m2!1sfr!2sma!4v1732002629545!5m2!1sfr!2sma" title='Our location' width="600" height="100" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    );
}

export default Location;