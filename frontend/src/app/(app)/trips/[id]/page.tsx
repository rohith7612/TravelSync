"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { MapPin, Calendar, DollarSign, Users, ShieldCheck, MessageSquare, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { tripsService } from "@/services/trips";

export default function TripDetailsPage() {
    const params = useParams();
    const tripId = params.id as string;

    const [trip, setTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [joinStatus, setJoinStatus] = useState<"idle" | "loading" | "requested">("idle");

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const data = await tripsService.getTripDetails(tripId);
                setTrip(data);
            } catch (err: any) {
                console.error("Fetch Trip Error:", err);
                setError("Failed to load trip details. It may have been deleted or made private.");
            } finally {
                setLoading(false);
            }
        };

        if (tripId) fetchTripDetails();
    }, [tripId]);

    const handleRequestJoin = async () => {
        setJoinStatus("loading");
        try {
            await tripsService.requestToJoin(tripId);
            setJoinStatus("requested");
        } catch (err: any) {
            console.error("Join Request Error:", err);
            alert(err?.response?.data?.error || "Failed to send join request. You may have already requested.");
            setJoinStatus("idle");
        }
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="h-full flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-3xl p-8">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Trip Not Found</h2>
                    <p className="text-slate-400">{error}</p>
                </div>
            </div>
        );
    }

    // Safe destructure matching backend model names
    const spotsLeft = trip.total_spots - (trip.participants?.length || 1); // 1 for host

    return (
        <div className="h-full overflow-y-auto bg-slate-950 pb-20">

            {/* Massive Hero Section */}
            <div className="relative h-[400px] md:h-[500px] w-full bg-slate-900">
                {/* Abstract pattern placeholder since we don't have user images yet */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "30px 30px" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-indigo-900/30"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            {/* AI Match Badge (mocked for detail view unless backend provides it) */}
                            {trip.is_public && (
                                <div className="mb-4 inline-flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md">
                                    <Sparkles className="w-3 h-3" /> Community Trip
                                </div>
                            )}
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{trip.title}</h1>
                            <p className="text-lg text-slate-300 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-indigo-400" /> {trip.destination}
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleRequestJoin}
                            disabled={joinStatus !== "idle" || spotsLeft <= 0}
                            className={`px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(99,102,241,0.5)] shrink-0 flex items-center gap-2 transition-colors ${joinStatus === "requested" ? "bg-emerald-500 text-white cursor-not-allowed" :
                                    spotsLeft <= 0 ? "bg-slate-700 text-slate-400 cursor-not-allowed" :
                                        "bg-indigo-600 hover:bg-indigo-500 text-white"
                                }`}
                        >
                            {joinStatus === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                            {joinStatus === "requested" ? "Request Sent!" :
                                spotsLeft <= 0 ? "Trip Full" :
                                    "Request to Join"}
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Left Column: Details */}
                <div className="md:col-span-2 space-y-10">

                    {/* Host Block */}
                    <div className="flex items-center justify-between p-6 bg-slate-900 border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-indigo-500/20 text-indigo-400 font-bold border-2 border-indigo-500 flex items-center justify-center text-xl">
                                {(trip.host?.username || "H").charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm">Hosted by</p>
                                <h3 className="text-xl font-bold text-white flex items-center gap-1">
                                    {trip.host?.username || "Anonymous"}
                                </h3>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 border border-white/20 hover:bg-white/10 px-4 py-2 rounded-xl text-white font-medium transition-colors">
                            <MessageSquare className="w-4 h-4" /> Message
                        </button>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">About this trip</h3>
                        <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">{trip.description || "No description provided."}</p>
                    </div>

                </div>

                {/* Right Column: Stats Sticky Box */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-white mb-6">Trip Logistics</h3>

                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400"><Calendar className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-white font-medium">{new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400"><DollarSign className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-white font-medium">${trip.estimated_budget}</p>
                                    <p className="text-slate-500 text-sm">Estimated budget</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400"><Users className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-white font-medium">{spotsLeft} spots remaining</p>
                                    <p className="text-slate-500 text-sm">{trip.total_spots} total capacity</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500" style={{ width: `${Math.max(10, ((trip.total_spots - spotsLeft) / trip.total_spots) * 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
