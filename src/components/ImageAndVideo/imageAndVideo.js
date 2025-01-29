import LazyMedia from "../lazyMedia/LazyMedia";
import styles from "./imageAndVideo.module.css";

function ImageAndVideo({ img, vid }) {
    return (
        <div className={styles.container}>
            <LazyMedia type={'image'} src={img} alt="item-image" />
            <LazyMedia type={'video'} src={vid} alt="item-video" className={styles.video} />
        </div>
    );
}

export default ImageAndVideo;
