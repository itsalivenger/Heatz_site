import styles from './shopHero.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [1, 2, 3, 4]
function ShopHero() {
    return (
        <div>
            `<div className={styles["container-of-all"]}>
                <img alt='background' className={styles["item-image"]} src="./images/flayers/shopBackground.png" />

                <div className={styles["video-stylish-container"]}>
                    <div className={styles["stylich-container"]}>
                        <span className={styles["stylish-title"]}>Stylé & Durable.</span>
                        <span className={styles["stylish-description"]}>Profitez d'un son cristallin et de basses profondes</span>
                        <span className={styles["stylish-price"]}>1999 DH</span>
                        <button className={styles["add-to-cart"]}>Ajouter au Panier</button>
                    </div>

                    <div className={styles["item-video-container"]}>
                        <video className={styles["item-video"]} autoPlay loop muted>
                            <source src="./videos/heroVid.mp4" type="video/mp4" />
                            Oups! Vidéo non supportée, vous pourriez vouloir changer de navigateur.
                        </video>
                    </div>
                </div>

                {/* <ThisComponentSlider slides={slides} /> */}
                <div className={styles["slider-container"]}>
                    {/* <ThisComponentSlider slides={slides} /> */}
                </div>
            </div>`
        </div>
    );
}

function ThisComponentSlider({ slides }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className={styles["slide-container"]}>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index}>
                        <Slide />
                    </div>
                ))}
            </Slider>
        </div>
    );
}


const Slide = () => {
    return (
        <div className={styles["slide"]}>
            <div className={styles["slide-image-container"]}>
                <img alt='slide' className={styles["slide-image"]} src="./images/products/slideImage.png" />
            </div>
            <div className={styles["slide-text-content"]}>
                <span className={styles["slide-title"]}>Stylé &<br />Durable.</span>
                <span className={styles["slide-price"]}>1999 DH</span>
                <span className={styles["slide-plus"]}>+</span>
            </div>
        </div>
    )
};

export default ShopHero;