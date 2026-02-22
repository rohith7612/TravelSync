"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CreditCard, Bell, ChevronRight, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { tripsService } from "@/services/trips";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { user } = useAuthStore();
    const router = useRouter();

    const [upcomingTrips, setUpcomingTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const trips = await tripsService.getDashboardTrips();
                setUpcomingTrips(trips);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    const nextTrip = upcomingTrips.length > 0 ? upcomingTrips[0] : null;

    return (
        <div className="p-6 lg:p-10 h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-8 pb-10">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome back, {user?.username || "Traveler"}! 👋
                    </h1>
                    <p className="text-slate-400">Here's the latest on your upcoming trips and group expenses.</p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Main Widget: Upcoming Trip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:col-span-2 bg-slate-900 border border-white/10 rounded-3xl p-1 relative overflow-hidden group shadow-xl min-h-[300px]"
                    >
                        {loading ? (
                            <div className="w-full h-full flex items-center justify-center min-h-[300px]">
                                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                            </div>
                        ) : nextTrip ? (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/30 opacity-70"></div>
                                {/* Abstract BG */}
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "20px 20px" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                                <div className="relative h-full flex flex-col justify-end p-8 min-h-[300px]">
                                    <div className="bg-indigo-500/20 text-indigo-300 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/30 backdrop-blur-md">
                                        Next Trip ✈️
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-2">{nextTrip.title}</h2>
                                    <p className="text-slate-300 flex items-center gap-2 mb-6 text-sm">
                                        <MapPin className="w-4 h-4" /> {nextTrip.destination}  •  <Calendar className="w-4 h-4 ml-2" /> {new Date(nextTrip.start_date).toLocaleDateString()}
                                    </p>

                                    <div className="flex gap-4 items-center justify-between border-t border-white/10 pt-6">
                                        <div className="flex -space-x-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-teal-500 flex items-center justify-center text-xs font-bold overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" /></div>
                                        </div>
                                        <button onClick={() => router.push(`/trips/${nextTrip.id}`)} className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm">
                                            View Itinerary
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="relative h-full flex flex-col items-center text-center justify-center p-8 min-h-[300px] border border-dashed border-white/20 rounded-2xl m-2">
                                <h3 className="text-xl font-bold text-white mb-2">No upcoming trips</h3>
                                <p className="text-slate-400 mb-6">You aren't participating in any upcoming adventures.</p>
                                <Link href="/discover" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                                    Discover Trips
                                </Link>
                            </div>
                        )}
                    </motion.div>

                    {/* Action Center - Notifications */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-900 border border-white/10 rounded-3xl p-6 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-white flex items-center gap-2"><Bell className="w-5 h-5 text-indigo-400" /> Action Center</h3>
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">1</span>
                        </div>

                        <div className="space-y-4 flex-1">
                            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl relative overflow-hidden group hover:bg-indigo-500/20 cursor-pointer transition-colors">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                                <p className="text-sm text-slate-300"><span className="font-bold text-white">System</span> welcomes you to <span className="text-indigo-300">TripSync</span>.</p>
                                <p className="text-xs text-slate-500 mt-1">Just now</p>
                            </div>
                        </div>
                        <button className="w-full text-center text-sm text-slate-500 hover:text-white mt-4 flex items-center justify-center hover:bg-slate-800 py-2 rounded-lg transition-colors">
                            View all
                        </button>
                    </motion.div>

                    {/* Expense Summary Widget */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900 border border-white/10 rounded-3xl p-6 flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-bold text-white flex items-center gap-2 mb-1"><CreditCard className="w-5 h-5 text-emerald-400" /> Balances</h3>
                                <p className="text-xs text-slate-500">Across all active trips</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">You owe</p>
                                <div className="text-2xl font-bold text-slate-500 border-l-4 border-slate-700 pl-3">
                                    $0.00
                                </div>
                            </div>

                            <div className="h-px w-full bg-white/10"></div>

                            <div>
                                <p className="text-slate-400 text-sm mb-1">You are owed</p>
                                <div className="text-2xl font-bold text-slate-500 border-l-4 border-slate-700 pl-3">
                                    $0.00
                                </div>
                            </div>
                        </div>

                        <Link href="/expenses" className="mt-8 bg-slate-800 hover:bg-slate-700 text-white w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                            Settle Debts <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
