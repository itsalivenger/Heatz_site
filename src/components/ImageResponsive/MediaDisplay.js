import React from 'react';
import styles from './MediaDisplay.module.css';

const MediaDisplay = ({ type, src, alt = '', controls = true, autoplay = false }) => {
  return (
    <div className={styles.mediaContainer}>
      {type === 'video' ? (
        <video
          className={styles.media}
          src={src}
          controls={controls}
          autoPlay={autoplay}
          loop
        />
      ) : (
        <img className={styles.media} src={src} alt={alt} />
      )}
    </div>
  );
};

export default MediaDisplay;
