import { lazy, Suspense, useEffect, useState } from "react";
import sendRequest from "../../components/other/sendRequest";
import HeroSection from "../../components/heroSection/HeroSection";
import HeroCarousel from "../../components/heroCarousel/herocarousel";
import { serverDomain } from "../../components/other/variables";
import LoadingSpinner from "../../components/LoadingSpinner/loadingSpinner";
import { useTheme } from '../../components/other/useTheme.js';

// Lazy load all components
const ColoredDivider = lazy(() => import("../../components/coloredHr/coloredDivider"));
const TitleAndText = lazy(() => import("../../components/TitleAndText/TitleAndText"));
const ImageAndVideo = lazy(() => import("../../components/ImageAndVideo/imageAndVideo"));
const ProductsCardsCarousel = lazy(() => import("../../components/ProductsCardsCarousel/productsCardsCarousel"));
const ProductsCarousel = lazy(() => import("../../components/ProductsCarousel/productsCarousel"));
const VideoCarousel = lazy(() => import("../../components/ImageGallery/videoCarousel"));
const Popup = lazy(() => import("../../components/popup/popup"));
const HomeCategories = lazy(() => import("../../components/homeCategories/homeCategories"));
const ShippingFeatures = lazy(() => import("../../components/shippingFeature/shippingFeature"));

function Home() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({});
  const { theme } = useTheme();

  useEffect(() => {
    const getProductsSamples = async () => {
      const response = await sendRequest(`${serverDomain}/products/carouselSamples`, 'GET');
      if (response.error) {
        console.log(response.error);
      } else {
        setProducts(response.products ? response.products : []);
      }
    }

    getProductsSamples();
  }, []);

  const togglePopup = (content) => {
    setIsOpen(!isOpen);
    setContent(content);
  }

  // Loading fallback component
  const LoadingFallback = () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100px' 
    }}>
      <LoadingSpinner />
    </div>
  );

  return (
    <div className={theme}>
      <Suspense fallback={<LoadingFallback />}>
        <HeroSection />
        <HomeCategories />
        <TitleAndText 
          title={"Améliorez Votre Expérience de Jeu"} 
          text={`Découvrez nos produits de pointe conçus pour une immersion totale et des performances optimales. Profitez d'un son immersif, d'une précision accrue, et d'un confort exceptionnel.`} 
        />
        <HeroCarousel />
        <ShippingFeatures />
        <ProductsCardsCarousel categories={['Casque', 'Souris', 'Clavier', 'Offres 10%']} />
        <ProductsCarousel togglePopup={togglePopup} products={products.length ? products : []} />
        <ColoredDivider />
        <ImageAndVideo img={"./images/flayers/gaming.jpeg"} vid={"https://res.cloudinary.com/dkhvdihhj/video/upload/v1739022957/watchLast_rd2hpb.mp4"} />
        <TitleAndText 
          title={"Améliorez Votre Expérience de Jeu"} 
          text={`Optimisez votre expérience de jeu avec des accessoires performants, des casques audio immersifs et des périphériques conçus pour offrir précision et confort lors de vos sessions gaming.`} 
        />
        <HeroCarousel />
        <ProductsCardsCarousel categories={['Casque', 'Souris', 'Clavier', 'Offres 10%']} />
        <ProductsCarousel togglePopup={togglePopup} products={products.length ? products : []} />
        <ColoredDivider />
        <ImageAndVideo img={"./images/flayers/watch.jpeg"} vid={"https://res.cloudinary.com/dkhvdihhj/video/upload/v1739022991/hero2_cryi01.mp4"} />
        <TitleAndText 
          title={"Produits Tendance"} 
          text={`Découvrez notre sélection de produits innovants, des accessoires tech de qualité pour améliorer votre quotidien.`} 
        />
        <Popup onClose={() => setIsOpen(false)} isOpen={isOpen} content={content.content} title={content.title} />
        <VideoCarousel />
      </Suspense>
    </div>
  );
}

export default Home;