"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // We don't want the global Navbar/Footer on routes inside (app) 
    // like /discover, /dashboard, /create-trip, or /trips/[id]
    const hideGlobalLayout =
        pathname.includes("/dashboard") ||
        pathname.includes("/discover") ||
        pathname.includes("/create-trip") ||
        pathname.includes("/trips/") ||
        pathname.includes("/messages") ||
        pathname.includes("/expenses");

    return (
        <>
            {!hideGlobalLayout && <Navbar />}
            {children}
            {!hideGlobalLayout && <Footer />}
        </>
    );
}
