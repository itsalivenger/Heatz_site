import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        console.log('Initializing particles...');
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log('Particles loaded!');
    }, []);

    return (
        <div>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: '#000'
                    },
                    particles: {
                        links: {
                            color: "#fff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        number: {
                            value: 100,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: "#fff"
                        },
                        shape: {
                            type: "circle"
                        },
                        size: {
                            value: 1
                        },
                        move: {
                            enable: true,
                            speed: 3
                        },
                        opacity: {
                            value: 0.5
                        }
                    },
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "grab"
                            },
                            onClick: {
                                enable: true,
                                mode: "push"
                            }
                        }
                    },
                    detectRetina: true
                }}
            />
        </div>
    );
};

export default ParticlesBackground;