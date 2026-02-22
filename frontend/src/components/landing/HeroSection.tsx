"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
            {/* Dynamic Animated Background */}
            <div className="absolute inset-0 w-full h-full">
                {/* Glow behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full"></div>
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full"></div>

                {/* Mouse interactive glow */}
                <motion.div
                    animate={{
                        x: mousePosition.x - 200,
                        y: mousePosition.y - 200,
                    }}
                    transition={{ type: "spring", damping: 40, stiffness: 100, mass: 0.5 }}
                    className="hidden md:block absolute w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"
                ></motion.div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('https://meshgradient.com/gallery/1.png')] opacity-[0.03] mix-blend-overlay bg-cover"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))"
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                {/* Pill Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 inline-flex items-center gap-2"
                >
                    <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-slate-300">The new way to travel</span>
                </motion.div>

                {/* Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-4 max-w-4xl"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                        Find Your <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Travel Tribe
                        </span>
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mx-auto mt-6">
                        The smartest way to plan trips, split expenses, and travel better together. Explore the world with perfectly matched companions.
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mt-10"
                >
                    <Link
                        href="/register"
                        className="group relative px-8 py-4 rounded-full bg-white text-indigo-950 font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] flex items-center justify-center w-full sm:w-auto overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get Started
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>

                    <Link
                        href="/discover"
                        className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium text-lg hover:bg-white/10 transition-colors w-full sm:w-auto flex justify-center"
                    >
                        Explore Trips
                    </Link>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">Scroll down</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
