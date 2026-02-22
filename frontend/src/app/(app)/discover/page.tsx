"use client";

import { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, MapPin, Loader2 } from "lucide-react";
import TripCard from "@/components/discover/TripCard";
import { motion, AnimatePresence } from "framer-motion";
import { tripsService } from "@/services/trips";

export default function DiscoverPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await tripsService.getDiscoverFeed();
                setTrips(data);
            } catch (err) {
                console.error("Failed to load feed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    // Simple client-side search filtering
    const filteredTrips = trips.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col p-6 lg:p-10 relative">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
                {/* Header Region */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Discover Trips</h1>
                    <p className="text-slate-400">Find your next adventure. Ranked by our AI compatibility algorithm.</p>
                </div>

                {/* Search & Utility Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search destinations, trip names..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`px-6 py-3.5 rounded-2xl font-medium flex items-center gap-2 transition-all ${showFilters
                            ? "bg-indigo-500 text-white shadow-[0_4px_20px_0_rgba(99,102,241,0.4)]"
                            : "bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-800"
                            }`}
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        Filters
                    </button>
                </div>

                {/* Dynamic Layout: Filters + Grid */}
                <div className="flex gap-8 flex-1">

                    {/* Animated Filters Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ width: 0, opacity: 0, scale: 0.95 }}
                                animate={{ width: 300, opacity: 1, scale: 1 }}
                                exit={{ width: 0, opacity: 0, scale: 0.95 }}
                                className="hidden lg:block shrink-0 h-fit bg-slate-900 border border-white/10 rounded-3xl p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-white">Advanced Filters</h3>
                                    <Filter className="w-4 h-4 text-slate-500" />
                                </div>

                                <div className="space-y-6">
                                    {/* Filter: Budget */}
                                    <div>
                                        <label className="text-sm font-medium text-slate-400 mb-2 block">Max Budget</label>
                                        <input type="range" className="w-full accent-indigo-500" />
                                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                                            <span>$0</span>
                                            <span>$5000+</span>
                                        </div>
                                    </div>

                                    {/* Filter: Travel Style */}
                                    <div>
                                        <label className="text-sm font-medium text-slate-400 mb-2 block">Travel Style</label>
                                        <div className="space-y-2">
                                            {['Backpacking', 'Luxury', 'Adventure', 'Relaxation'].map(style => (
                                                <label key={style} className="flex items-center gap-3 text-sm text-slate-300">
                                                    <input type="checkbox" className="rounded border-white/20 bg-slate-800 text-indigo-500 focus:ring-indigo-500/50" />
                                                    {style}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Filter: Verification */}
                                    <div className="pt-4 border-t border-white/10">
                                        <label className="flex items-center justify-between cursor-pointer">
                                            <span className="text-sm font-medium text-slate-300">Verified Hosts Only</span>
                                            <div className="relative inline-block w-10 h-6">
                                                <input type="checkbox" className="peer sr-only" />
                                                <div className="w-10 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Trips Feed */}
                    <div className="flex-1 pb-10">
                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                            </div>
                        ) : filteredTrips.length === 0 ? (
                            <div className="text-center text-slate-500 py-10 bg-slate-900 border border-white/10 rounded-3xl">
                                No trips found. Try adjusting your filters or search query!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredTrips.map((trip: any) => (
                                    <TripCard
                                        key={trip.id}
                                        trip={{
                                            id: trip.id,
                                            title: trip.title,
                                            destination: trip.destination,
                                            startDate: new Date(trip.start_date).toLocaleDateString(),
                                            endDate: new Date(trip.end_date).toLocaleDateString(),
                                            budget: `$${trip.estimated_budget}`,
                                            spotsTotal: trip.total_spots,
                                            spotsFilled: trip.participants?.length || 1,
                                            hostName: trip.host?.username || "Anonymous",
                                            hostVerified: true, // we assume verified for now
                                            compatibilityScore: 95 // Simulated AI score for the feed 
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
