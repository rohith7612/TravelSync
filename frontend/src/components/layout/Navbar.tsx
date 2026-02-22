"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PlaneTakeoff } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll for glossy effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: "Discover", href: "/discover" },
        { name: "How it Works", href: "/#how-it-works" },
        { name: "Safety", href: "/#safety" },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-slate-900/80 backdrop-blur-md border-b border-white/10 shadow-lg py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all">
                        <PlaneTakeoff className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        TripSync
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                    <div className="h-6 w-px bg-white/20"></div>
                    <Link
                        href="/login"
                        className="text-white hover:text-indigo-300 transition-colors"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/register"
                        className="px-5 py-2.5 rounded-full bg-white text-indigo-900 font-medium hover:bg-gray-100 transition-colors hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] relative overflow-hidden group"
                    >
                        <span className="relative z-10">Sign Up Free</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/10"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-300 hover:text-white transition-colors text-lg font-medium py-2"
                                    onClick={toggleMenu}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px w-full bg-white/10 my-2"></div>
                            <Link
                                href="/login"
                                className="text-white hover:text-indigo-300 transition-colors text-lg"
                                onClick={toggleMenu}
                            >
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-center hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all"
                                onClick={toggleMenu}
                            >
                                Sign Up Free
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
