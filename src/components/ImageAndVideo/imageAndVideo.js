import styles from "./imageAndVideo.module.css";

function ImageAndVideo({ img, vid }) {
    return (
        <div className={styles.container}>
            <img src={img} alt="item-image" />
            <video autoPlay loop muted>
                <source src={vid} type="video/mp4" />
                Oops! Video not supported, you might wanna change your browser.
            </video>
        </div>
    );
}

export default ImageAndVideo;
