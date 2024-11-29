'use client';
import { FaAnglesUp } from "react-icons/fa6";
import { animateScroll as scroll } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
    const controls = useAnimation();
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 500,
            smooth: true
        });
    };

    const iconVariants = {
        initial: { y: 0, opacity: 0.5 },
        animate: {
            y: [-10, 0, -10],
            opacity: [0.5, 1, 0.5],
            transition: {
                duration: 3,
                repeat: 2,
                repeatType: 'loop' as const, // Correcting the type
            },
        },
    };

    useEffect(() => {
        const startAnimation = async () => {
            while (true) {
                await controls.start('animate');
                await controls.start('initial');
                await new Promise(resolve => setTimeout(resolve, 6000)); // 10 seconds delay
            }
        };
        startAnimation();
    }, [controls]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const thirdPageHeight = document.documentElement.scrollHeight / 5;
            setIsVisible(scrollPosition > thirdPageHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 md:left-auto md:right-5 z-50'>
                    <button
                        onClick={scrollToTop}
                        className='px-4 py-2 bg-zinc-950 flex gap-2 justify-center items-center text-lg text-sky-300 font-bold rounded-full shadow-lg z-50 border border-white text-nowrap'
                    >
                        <motion.div
                            variants={iconVariants}
                            initial="initial"
                            animate={controls}
                        >
                            <FaAnglesUp />
                        </motion.div>
                        GET A QUOTE
                        <motion.div
                            variants={iconVariants}
                            initial="initial"
                            animate={controls}
                        >
                            <FaAnglesUp />
                        </motion.div>
                    </button>
                </div>
            )}
        </>
    );
};

export default ScrollToTopButton;