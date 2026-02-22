"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ShieldAlert, HeartHandshake } from "lucide-react";

export default function SafetySection() {
    return (
        <section id="safety" className="py-24 bg-slate-950 relative overflow-hidden flex items-center">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-[500px] bg-blue-900/10 blur-[150px] rounded-full"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Trust & Verification</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Safety is our <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Top Priority.</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-lg">
                            We implement rigid safety constraints and proactive trust networks so that you can explore the world locally and globally with peace of mind.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-slate-900 rounded-xl mt-1 text-blue-400">
                                    <BadgeCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Verified ID Badges</h4>
                                    <p className="text-slate-400 text-sm mt-1">Users must scan governmental IDs before they can host or join official trips, weeding out bots and bad actors.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-slate-900 rounded-xl mt-1 text-pink-400">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">1-Click SOS Alert</h4>
                                    <p className="text-slate-400 text-sm mt-1">Found yourself in an emergency? Tap the SOS button in the app to instantly share your GPS coordinates with your emergency contacts.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-slate-900 rounded-xl mt-1 text-purple-400">
                                    <HeartHandshake className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Community Moderation</h4>
                                    <p className="text-slate-400 text-sm mt-1">All members receive ratings after every trip. Continuous bad actors are globally banned from the TripSync network.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-[80px]"></div>
                        <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
                            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                                <div>
                                    <h3 className="text-white font-bold text-xl">Travel Profile</h3>
                                    <p className="text-slate-400 text-sm">Preview</p>
                                </div>
                                <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-blue-500/30">
                                    <BadgeCheck className="w-4 h-4" /> ID Verified
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-indigo-500"></div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">Alex Traveler</h4>
                                    <p className="text-slate-400 text-sm flex items-center gap-1">⭐ 4.9/5 (24 trips)</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-[90%]"></div>
                                </div>
                                <p className="text-xs text-slate-500 text-right">Trust Score: 98%</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
