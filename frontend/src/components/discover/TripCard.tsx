"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Users, BadgeCheck } from "lucide-react";

interface TripCardProps {
    id: string;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    spotsTotal: number;
    spotsFilled: number;
    hostName: string;
    hostVerified: boolean;
    compatibilityScore?: number; // From AI matching
}

export default function TripCard({ trip }: { trip: TripCardProps }) {
    // Determine gradient color based on AI Match Score
    const getScoreColor = (score: number) => {
        if (score >= 90) return "from-green-500 to-emerald-400";
        if (score >= 70) return "from-indigo-500 to-purple-400";
        return "from-slate-500 to-slate-400";
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all"
        >
            {/* Top Image Banner Placeholder */}
            <div className="h-40 w-full bg-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 mix-blend-overlay group-hover:scale-110 transition-transform duration-500"></div>
                {/* Abstract pattern */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "20px 20px" }}></div>

                {/* AI Match Badge */}
                {trip.compatibilityScore && (
                    <div className={`absolute top-4 right-4 bg-gradient-to-r ${getScoreColor(trip.compatibilityScore)} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 backdrop-blur-md`}>
                        {trip.compatibilityScore}% Match
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{trip.title}</h3>
                        <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {trip.destination}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="block text-white font-bold">{trip.budget}</span>
                        <span className="text-slate-500 text-xs uppercase tracking-wider">Budget</span>
                    </div>
                </div>

                <div className="flex gap-4 mb-5 border-y border-white/5 py-3">
                    <div className="flex-1">
                        <p className="text-slate-500 text-xs mb-1 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Dates</p>
                        <p className="text-slate-300 text-sm">{trip.startDate} - {trip.endDate}</p>
                    </div>
                    <div className="flex-1">
                        <p className="text-slate-500 text-xs mb-1 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Availability</p>
                        <p className="text-slate-300 text-sm">{trip.spotsTotal - trip.spotsFilled} spots left</p>
                    </div>
                </div>

                {/* Host Info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                            {trip.hostName.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white flex items-center gap-1">
                                Hosted by {trip.hostName}
                                {trip.hostVerified && <BadgeCheck className="w-4 h-4 text-blue-400" />}
                            </p>
                        </div>
                    </div>
                    <button className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium hover:bg-indigo-500 hover:text-white transition-colors">
                        View
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
