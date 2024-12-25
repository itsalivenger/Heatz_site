import styles from './AboutPage.module.css';
import AboutHero from './components/AboutHero/AboutHero';
import AboutStats from './components/AboutStats/AboutStats';
import AboutFeatures from './components/AboutFeatures/AboutFeatures';
import AboutInnovation from './components/AboutInnovation/AboutInnovation';
import AboutTestimonials from './components/AboutTestimonials/AboutTestimonials';

function AboutPage() {
    return (
        <div className={styles.container}>
            <AboutHero />
            <AboutStats />
            <AboutFeatures />
            <AboutInnovation />
            <AboutTestimonials />
        </div>
    );
}

export default AboutPage;