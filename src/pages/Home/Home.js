import ColoredDivider from "../../components/coloredHr/coloredDivider";
import HeroCarousel from "../../components/heroCarousel/herocarousel";
import HeroSection from "../../components/heroSection/HeroSection";
import TitleAndText from "../../components/TitleAndText/TitleAndText";
import ImageAndVideo from "../../components/ImageAndVideo/imageAndVideo";
import ProductsCardsCarousel from "../../components/ProductsCardsCarousel/productsCardsCarousel";
import ProductsCarousel from "../../components/ProductsCarousel/productsCarousel";
import VideoCarousel from "../../components/ImageGallery/videoCarousel";
import { useEffect, useState } from "react";
import sendRequest from "../../components/other/sendRequest";
import { serverDomain } from "../../components/other/variables";
import Popup from "../../components/popup/popup";
// import CategoriesSection from "../Shop/CategoriesSection";
import HomeCategories from "../../components/homeCategories/homeCategories";
import { ShippingFeatures } from "../../components/shippingFeature/shippingFeature";

const productsMockup = [
  {
    id: 1,
    imageSrc: './images/products/headset1.png',
    note: 'meilleure vente',
    title: 'Casque Bluetooth sans fil',
    description: 'Casque sans fil de haute qualité avec réduction de bruit et autonomie de 20 heures',
    price: 99.99
  },
  {
    id: 2,
    imageSrc: './images/products/headset2.png',
    note: 'meilleure vente',
    title: 'Montre de Fitness Intelligente',
    description: 'Suivez votre santé et votre forme physique avec cette montre intelligente dotée de la surveillance de la fréquence cardiaque',
    price: 149.99
  },
  {
    id: 3,
    imageSrc: './images/products/headset3.png',
    note: 'meilleure vente',
    title: 'Batterie Externe Portable',
    description: 'Batterie externe haute capacité de 20000mAh avec capacités de charge rapide',
    price: 49.99
  },
  // ... Remaining products similarly translated
];

function Home() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({});



  useEffect(() => {
    const getProductsSamples = async () => {
      const response = await sendRequest(`${serverDomain}/products/carouselSamples`, 'GET');
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response);
        setProducts(response.products ? response.products : []);
      }
    }

    getProductsSamples();
  }, [])

  const togglePopup = (content) => {
    setIsOpen(!isOpen);
    setContent(content);
  }

  return (
    <div>
      <HeroSection />
      <HomeCategories />
      <TitleAndText title={"Améliorez Votre Expérience de Jeu"} text={`Découvrez nos produits de pointe conçus pour une immersion totale et des performances optimales. Profitez d'un son immersif, d'une précision accrue, et d'un confort exceptionnel.`} />
      <HeroCarousel />
      <ShippingFeatures />
      <ProductsCardsCarousel categories={['Casque', 'Souris', 'Clavier', 'Offres 10%']} />
      <ProductsCarousel togglePopup={togglePopup} products={products.length ? products : productsMockup} />
      <ColoredDivider />
      <ImageAndVideo img={"./images/flayers/gaming.jpeg"} vid={"./videos/watchLast.mp4"} />
      <TitleAndText title={"Améliorez Votre Expérience de Jeu"} text={`Optimisez votre expérience de jeu avec des accessoires performants, des casques audio immersifs et des périphériques conçus pour offrir précision et confort lors de vos sessions gaming.`} />
      <HeroCarousel />
      <ProductsCardsCarousel categories={['Casque', 'Souris', 'Clavier', 'Offres 10%']} />
      <ProductsCarousel togglePopup={togglePopup} products={products.length ? products : productsMockup} />
      <ColoredDivider />
      <ImageAndVideo img={"./images/flayers/watch.jpeg"} vid={"./videos/hero2.mp4"} />
      <TitleAndText title={"Produits Tendance"} text={`Découvrez notre sélection de produits innovants, des accessoires tech de qualité pour améliorer votre quotidien.`} />
      <Popup onClose={() => setIsOpen(false)} isOpen={isOpen} content={content.content} title={content.title} />
      <VideoCarousel />
    </div>
  );
}

export default Home;