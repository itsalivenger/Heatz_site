import { useState, useEffect, useRef } from "react";

const LazyMedia = ({ type, src, alt = "", className = "", poster = "", ...props }) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const mediaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }

    return () => {
      if (mediaRef.current) observer.unobserve(mediaRef.current);
    };
  }, []);

  return (
    <>
      {type.toLowerCase() === "image" && (
        <img
          ref={mediaRef}
          src={isInViewport ? src : undefined}
          alt={alt}
          className={className}
          loading="lazy"
          {...props}
        />
      )}
      {type.toLowerCase() === "video" && (
        <video
          ref={mediaRef}
          src={isInViewport ? src : undefined}
          poster={poster}
          className={className}
          autoPlay
          muted
          loop
          playsInline
          {...props}
        />
      )}
    </>
  );
};

export default LazyMedia;
