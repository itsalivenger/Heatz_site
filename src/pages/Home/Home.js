import { lazy, Suspense, useEffect, useState } from "react";
import sendRequest from "../../components/other/sendRequest";
import { serverDomain } from "../../components/other/variables";

// Lazy load all components
const ColoredDivider = lazy(() => import("../../components/coloredHr/coloredDivider"));
const HeroCarousel = lazy(() => import("../../components/heroCarousel/herocarousel"));
const HeroSection = lazy(() => import("../../components/heroSection/HeroSection"));
const TitleAndText = lazy(() => import("../../components/TitleAndText/TitleAndText"));
const ImageAndVideo = lazy(() => import("../../components/ImageAndVideo/imageAndVideo"));
const ProductsCardsCarousel = lazy(() => import("../../components/ProductsCardsCarousel/productsCardsCarousel"));
const ProductsCarousel = lazy(() => import("../../components/ProductsCarousel/productsCarousel"));
const VideoCarousel = lazy(() => import("../../components/ImageGallery/videoCarousel"));
const Popup = lazy(() => import("../../components/popup/popup"));
const HomeCategories = lazy(() => import("../../components/homeCategories/homeCategories"));
const ShippingFeatures = lazy(() => import("../../components/shippingFeature/shippingFeature"));

const productsMockup = [
  // ... your existing mockup data
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
      Chargement...
    </div>
  );

  return (
    <div>
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
        <ProductsCarousel togglePopup={togglePopup} products={products.length ? products : productsMockup} />
        <ColoredDivider />
        <ImageAndVideo img={"./images/flayers/gaming.jpeg"} vid={"./videos/watchLast.mp4"} />
        <TitleAndText 
          title={"Améliorez Votre Expérience de Jeu"} 
          text={`Optimisez votre expérience de jeu avec des accessoires performants, des casques audio immersifs et des périphériques conçus pour offrir précision et confort lors de vos sessions gaming.`} 
        />
        <HeroCarousel />
        <ProductsCardsCarousel categories={['Casque', 'Souris', 'Clavier', 'Offres 10%']} />
        <ProductsCarousel togglePopup={togglePopup} products={products.length ? products : productsMockup} />
        <ColoredDivider />
        <ImageAndVideo img={"./images/flayers/watch.jpeg"} vid={"./videos/hero2.mp4"} />
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