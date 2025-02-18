import styles from './AboutPage.module.css';
import AboutHero from './components/AboutHero/AboutHero';
import AboutStats from './components/AboutStats/AboutStats';
import AboutFeatures from './components/AboutFeatures/AboutFeatures';
import AboutInnovation from './components/AboutInnovation/AboutInnovation';
import AboutTestimonials from './components/AboutTestimonials/AboutTestimonials';
import ColoredDivider from '../../components/coloredHr/coloredDivider';

function AboutPage() {
    return (
        <div className={styles.container}>
            <AboutHero />
            <ColoredDivider />
            <AboutStats />
            <AboutFeatures />
            <AboutInnovation />
            <AboutTestimonials />
        </div>
    );
}

export default AboutPage;