import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-950 selection:bg-indigo-500/30">
            <Sidebar />
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* We can place a Mobile Header here if needed later */}
                <div className="flex-1 overflow-y-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
