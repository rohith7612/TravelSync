"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, DollarSign, Users, Sparkles, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { tripsService } from "@/services/trips";

export default function CreateTripPage() {
    const router = useRouter();


    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        destination: "",
        start_date: "",
        end_date: "",
        budget: "",
        max_participants: 4,
        description: "",
        travel_style: "adventure", // Required by backend
        is_public: true
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Call the Django REST API via the authenticated service
            const newTrip = await tripsService.createTrip({
                ...formData,
                budget: formData.budget.toString(),
            });

            // Redirect to the newly created trip's detail page
            router.push(`/trips/${newTrip.id}`);
        } catch (err: any) {
            console.error("Trip Creation Error Payload:", err?.response?.data);

            // Extract DRF field errors if they exist
            const responseData = err?.response?.data;
            let errorMessage = "Failed to create trip. Please ensure all fields are correct.";

            if (responseData) {
                if (responseData.detail) {
                    errorMessage = responseData.detail;
                } else if (typeof responseData === 'object') {
                    // Grab the first validation error key
                    const firstKey = Object.keys(responseData)[0];
                    if (firstKey && Array.isArray(responseData[firstKey])) {
                        errorMessage = `${firstKey}: ${responseData[firstKey][0]}`;
                    } else {
                        errorMessage = JSON.stringify(responseData);
                    }
                }
            }

            setError(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full bg-slate-950 p-6 lg:p-10 flex flex-col items-center justify-center relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-2xl relative z-10">

                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm font-medium text-slate-400 mb-2">
                        <span>Step {step} of 3</span>
                        <span>{Math.round((step / 3) * 100)}% Completed</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                            initial={{ width: "33%" }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        ></motion.div>
                    </div>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                        <AnimatePresence mode="wait">

                            {/* STEP 1: Basics */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-white mb-2">Where are we going? 🌍</h2>
                                        <p className="text-slate-400">Let's start with the name and destination.</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Trip Title</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                            placeholder="e.g. Summer in Tokyo"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Destination Area</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                            <input
                                                required
                                                type="text"
                                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                placeholder="City, Country, or Region"
                                                value={formData.destination}
                                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: Logistics */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-white mb-2">The Details 🗓️</h2>
                                        <p className="text-slate-400">When is it and what's the budget?</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
                                            <input
                                                required
                                                type="date"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-slate-300 focus:outline-none focus:border-indigo-500"
                                                value={formData.start_date}
                                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                                            <input
                                                required
                                                type="date"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-slate-300 focus:outline-none focus:border-indigo-500"
                                                value={formData.end_date}
                                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Estimated Budget</label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                <input
                                                    required
                                                    type="number"
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                                                    placeholder="Amount"
                                                    value={formData.budget}
                                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Total Spots</label>
                                            <div className="relative">
                                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                <input
                                                    required
                                                    type="number"
                                                    min="2"
                                                    max="20"
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                                                    value={formData.max_participants}
                                                    onChange={(e) => setFormData({ ...formData, max_participants: Number(e.target.value) })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Travel Style Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Travel Style</label>
                                        <select
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                                            value={formData.travel_style}
                                            onChange={(e) => setFormData({ ...formData, travel_style: e.target.value })}
                                        >
                                            <option value="adventure">Adventure</option>
                                            <option value="backpacking">Backpacking</option>
                                            <option value="luxury">Luxury</option>
                                            <option value="mid_range">Mid-Range</option>
                                            <option value="budget">Budget</option>
                                        </select>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: Finishing Touches */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-white mb-2">Almost ready 🚀</h2>
                                        <p className="text-slate-400">Describe the vibe and set visibility.</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Trip Description</label>
                                        <textarea
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                                            placeholder="What's the plan? What kind of travelers are you looking for?"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>

                                    <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.is_public}
                                                onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                                                className="w-5 h-5 rounded border-indigo-500 text-indigo-500 focus:ring-indigo-500/50 bg-slate-900"
                                            />
                                            <div>
                                                <p className="font-medium text-white">Public Trip</p>
                                                <p className="text-xs text-slate-400 mt-1">Our AI will recommend this trip to compatible travelers in the Discover feed.</p>
                                            </div>
                                        </label>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Form Controls */}
                        <div className={`mt-10 flex ${step === 1 ? 'justify-end' : 'justify-between'}`}>
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-6 py-3 rounded-xl font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex items-center gap-2 shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] transition-all disabled:opacity-70"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : step === 3 ? (
                                    <>Publish Trip <Sparkles className="w-4 h-4" /></>
                                ) : (
                                    <>Next <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
