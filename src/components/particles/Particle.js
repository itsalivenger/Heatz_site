import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = ({ theme }) => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesOptions = useMemo(() => ({
        background: {
            color: theme === "dark" ? "#000" : "#fff",
        },
        particles: {
            links: {
                color: theme === "dark" ? "#fff" : "#000",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: theme === "dark" ? "#fff" : "#000",
            },
            shape: {
                type: "circle",
            },
            size: {
                value: 1,
            },
            move: {
                enable: true,
                speed: 2,
            },
            opacity: {
                value: 0.5,
            },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab",
                },
                onClick: {
                    enable: false,
                },
            },
        },
        detectRetina: true,
    }), [theme]);

    return (
        <Particles
            key={theme} // Ensures re-render on theme change
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
        />
    );
};

export default ParticlesBackground;
