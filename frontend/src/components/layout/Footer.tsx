import Link from "next/link";
import { PlaneTakeoff, Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <PlaneTakeoff className="text-indigo-400 w-6 h-6" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                TripSync
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            The smartest way to plan trips, split expenses, and travel better together. Find your travel tribe today.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-medium mb-6">Product</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Discover Trips</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">AI Matching</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Expense Tracking</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Help Center</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Safety Guidelines</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Community Standards</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-6">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} TripSync. All rights reserved.
                    </p>
                    <div className="flex gap-2">
                        <span className="text-slate-500 text-sm">Made with 💜 in India</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
