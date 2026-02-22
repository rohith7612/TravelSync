"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
    const reviews = [
        {
            name: "Sarah Jenkins",
            title: "Solo Backpacker",
            text: "TripSync matched me with 3 amazing girls for my trip to Bali. We split our villa costs seamlessly and are planning our next trip together!",
        },
        {
            name: "David Chen",
            title: "Photographer",
            text: "The expense splitter feature alone is worth a million dollars. We didn't have to keep track of receipts or do awkward math at the end of the trip.",
        },
        {
            name: "Maya Patel",
            title: "Digital Nomad",
            text: "I felt so much safer bringing TripSync with me. The SOS feature and ID Verified badges gave me incredible peace of mind when meeting strangers.",
        },
    ];

    return (
        <section className="py-24 bg-slate-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Loved by 10,000+ travelers
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((rev, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className="bg-slate-950/50 backdrop-blur-md border border-white/5 rounded-3xl p-8"
                        >
                            <div className="flex text-yellow-500 mb-6 gap-1">
                                {"★★★★★"}
                            </div>
                            <p className="text-slate-300 italic mb-8">"{rev.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-800"></div>
                                <div>
                                    <h4 className="text-white font-medium text-sm">{rev.name}</h4>
                                    <p className="text-slate-500 text-xs">{rev.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
