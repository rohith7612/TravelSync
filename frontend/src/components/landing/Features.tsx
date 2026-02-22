"use client";

import { motion } from "framer-motion";
import { Sparkles, Users, Wallet, ShieldCheck } from "lucide-react";

export default function Features() {
    const cards = [
        {
            title: "AI Matchmaking",
            description: "Our Smart Algorithm pairs you with travelers who match your vibe, budget, and travel style.",
            icon: <Sparkles className="w-8 h-8 text-indigo-400" />,
            delay: 0.1,
        },
        {
            title: "Group Chat & Sync",
            description: "Discuss itineraries and finalize plans in real-time with integrated group and direct messaging.",
            icon: <Users className="w-8 h-8 text-purple-400" />,
            delay: 0.2,
        },
        {
            title: "Automated Expenses",
            description: "Split costs fairly. Add expenses on the go, track who owes who, and settle up easily.",
            icon: <Wallet className="w-8 h-8 text-pink-400" />,
            delay: 0.3,
        },
        {
            title: "Safety First",
            description: "Verified ID badges, SOS emergency alerts, and community reviews ensure a safe journey.",
            icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
            delay: 0.4,
        },
    ];

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Everything you need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">group travel.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-400 text-lg"
                    >
                        Say goodbye to endless spreadsheets and awkward money texts. TripSync handles the logistics so you can focus on the memories.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: card.delay }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:bg-slate-800/50 transition-colors shadow-2xl relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
