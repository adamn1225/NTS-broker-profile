'use client';
import { FaAnglesUp } from "react-icons/fa6";
import { animateScroll as scroll } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const ScrollToTopButton = () => {
    const controls = useAnimation();

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
                await new Promise(resolve => setTimeout(resolve, 3000)); // 10 seconds delay
            }
        };
        startAnimation();
    }, [controls]);

    return (
        <>
            <button
                onClick={scrollToTop}
                className='px-4 py-2 bg-zinc-950 flex gap-2 justify-center items-center text-sky-300 font-bold rounded-full shadow-lg z-50'
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
        </>
    );
};

export default ScrollToTopButton;