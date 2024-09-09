"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface SplashScreenProps {
    finishLoading: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ finishLoading }) => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10);
        if (isMounted) {
            setTimeout(() => finishLoading(), 2000);
        }
        return () => clearTimeout(timeout);
    }, [isMounted]);

    return (
        <div className="relative h-screen w-full overflow-hidden">

            <div className="absolute top-0 left-0 right-0 h-full w-full z-10">
                <div className="flex h-full w-full items-end justify-center pb-10">
                    {isMounted && (
                        <motion.div
                            initial={{ x: -700, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                ease: 'easeInOut',
                                type: 'spring',
                                duration: 1,

                            }}
                            className="mr-80 mb-72 text-xl whitespace-nowrap font-black italic tracking-widest text-white dark:bg-gray-900"
                        >
                            {/* Book Exchange Platform */}
                        </motion.div>
                    )}
                </div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-full w-full z-10">
                <div className="flex h-full w-full items-center justify-center gap-5">
                    {isMounted && (
                        <>
                            {/* First Logo (Book Exchange Platform) */}
                            <motion.div
                                initial={{ x: -700, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    ease: 'easeInOut',
                                    type: 'spring',
                                    duration: 1,
                                }}
                                className="text-2xl whitespace-nowrap font-black italic tracking-widest text-white bg-gray-100 dark:bg-gray-900"
                            >
                                <motion.img src="/bep_logo.png" alt="Book Exchange platform"
                                    width={60} height={60} animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ delay: 1.1, duration: 1 }} 
                                />
                            </motion.div>

                            {/* Center Line */}
                            <motion.div
                                initial={{ x: -700, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    ease: 'easeInOut',
                                    type: 'spring',
                                    duration: 1,
                                }}
                                className="bg-gray-600 "
                            >
                                <div className="h-auto w-px my-8 bg-gray-600"></div>
                            </motion.div>

                            {/* Second Logo (Roshan Sharma) */}
                            <motion.div
                                initial={{ opacity: 0, x: 700 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    ease: 'easeInOut',
                                    type: 'spring',
                                    duration: 1,
                                }}
                                className="text-2xl whitespace-nowrap font-black italic tracking-widest text-white"
                            >
                                {theme === 'dark' ? (
                                    <motion.img src="/devSharmaLightLogo.png" alt="Light logo"
                                        width={120} height={60} animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ delay: 1.1, duration: 1 }} 
                                    />
                                ) : (
                                    <motion.img src="/devSharmaDarkLogo.png" alt="Dark logo"
                                        width={120} height={60} animate={{ scale: [1, 1.1, 1] }} 
                                        transition={{ delay: 1.1, duration: 1 }} 
                                    />
                                )}
                            </motion.div>
                        </>

                    )}
                </div>
            </div>

            <div className="absolute top-0 left-0 right-0 h-full w-full">
                <div className="flex h-full w-full items-center justify-center">
                    {isMounted && (
                        <motion.div
                            initial={{ opacity: 0, x: 700 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                ease: 'easeInOut',
                                type: 'spring',
                                duration: 1,

                            }}
                            className="ml-80 mt-28 text-xl whitespace-nowrap font-black italic tracking-widest dark:text-white text-black"
                        >
                            {/* Made by Roshan Sharma */}
                        </motion.div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default SplashScreen;
