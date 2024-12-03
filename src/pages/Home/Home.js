import ColoredDivider from "../../components/coloredHr/coloredDivider";
import HeroCarousel from "../../components/heroCarousel/herocarousel";
import HeroSection from "../../components/heroSection/HeroSection";
import TitleAndText from "../../components/TitleAndText/TitleAndText";
import ImageAndVideo from "../../components/ImageAndVideo/imageAndVideo";
import ProductsCardsCarousel from "../../components/ProductsCardsCarousel/productsCardsCarousel";
import ProductsCarousel from "../../components/ProductsCarousel/productsCarousel";
import VideoCarousel from "../../components/ImageGallery/videoCarousel";

const products = [
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
  return (
    <div>
      <HeroSection />
      <TitleAndText title={"Améliorez Votre Expérience de Jeu"} text={`Découvrez nos produits de pointe conçus pour une immersion totale et des performances optimales. Profitez d'un son immersif, d'une précision accrue, et d'un confort exceptionnel.`} />
      <HeroCarousel />
      <ProductsCardsCarousel />
      <ProductsCarousel products={products} />
      <ColoredDivider />
      <ImageAndVideo img={"./images/flayers/gaming.jpeg"} vid={"./videos/hero2.mp4"} />
      <TitleAndText title={"Améliorez Votre Expérience de Jeu"} text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`} />
      <HeroCarousel />
      <ProductsCardsCarousel />
      <ProductsCarousel products={products} />
      <ColoredDivider />
      <ImageAndVideo img={"./images/flayers/watch.jpeg"} vid={"./videos/hero2.mp4"} />
      <TitleAndText title={"Produits Tendance"} text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`} />
      <VideoCarousel />
    </div>
  );
}

export default Home;