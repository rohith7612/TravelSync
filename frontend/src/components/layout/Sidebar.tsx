"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlaneTakeoff, Compass, LayoutDashboard, MessageSquare, Wallet, LogOut, Settings } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const navItems = [
        { icon: Compass, label: "Discover", href: "/discover" },
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
        { icon: MessageSquare, label: "Messages", href: "/messages" },
        { icon: Wallet, label: "Expenses", href: "/expenses" },
    ];

    return (
        <aside className="w-64 bg-slate-950 border-r border-white/10 h-screen hidden md:flex flex-col sticky top-0 left-0 z-40">
            {/* Brand */}
            <div className="h-20 flex items-center px-6 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all">
                        <PlaneTakeoff className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        TripSync
                    </span>
                </Link>
            </div>

            {/* Nav Links */}
            <div className="flex-1 py-6 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? "bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20"
                                : "text-slate-400 hover:text-white hover:bg-slate-900"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-indigo-400" : ""}`} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            {/* Create Trip CTA */}
            <div className="p-4">
                <Link
                    href="/create-trip"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all"
                >
                    <PlaneTakeoff className="w-5 h-5" /> Host a Trip
                </Link>
            </div>

            {/* User Footer */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border focus:outline-none flex items-center justify-center text-indigo-300 font-bold border-white/10 overflow-hidden">
                        {user?.profile_picture ? (
                            <img src={user.profile_picture} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            user?.username?.charAt(0).toUpperCase() || "U"
                        )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">{user?.username || "Traveler"}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email || "User"}</p>
                    </div>
                </div>

                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors text-sm"
                >
                    <Settings className="w-4 h-4" /> Settings
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 mt-1 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors text-sm text-left"
                >
                    <LogOut className="w-4 h-4" /> Log out
                </button>
            </div>
        </aside>
    );
}
