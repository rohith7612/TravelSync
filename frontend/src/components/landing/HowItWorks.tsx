"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
    const steps = [
        {
            num: "01",
            title: "Create Your Profile",
            desc: "Set your travel style, budget, and destinations you want to visit.",
        },
        {
            num: "02",
            title: "Discover or Host Trips",
            desc: "Join an existing trip matching your vibe or create your own itinerary.",
        },
        {
            num: "03",
            title: "Connect & Plan",
            desc: "Chat with verified members, divide responsibilities, and sync up.",
        },
        {
            num: "04",
            title: "Travel & Split Costs",
            desc: "Log expenses on the go, and the app auto-calculates who owes who.",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-slate-900 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-indigo-400 font-semibold tracking-wider uppercase text-sm"
                    >
                        How it works
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mt-4"
                    >
                        Seamless traveling in <span className="underline decoration-indigo-500 decoration-4 underline-offset-8">4 steps</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connector Line (Desktop only) */}
                    <div className="hidden md:block absolute top-[20%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className="relative text-center md:text-left z-10"
                        >
                            <div className="w-16 h-16 mx-auto md:mx-0 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center text-xl font-bold text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)] mb-6">
                                {step.num}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
