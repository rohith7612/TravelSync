"use client";

import { useAuthStore } from "@/store/authStore";

export default function ExpensesPage() {
    const { user } = useAuthStore();

    return (
        <div className="h-full flex flex-col p-6 lg:p-10 relative">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <span className="text-4xl">💸</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Expense Splitter</h1>
                <p className="text-slate-400 max-w-md">
                    You don't have any active trip expenses. When you host or join a trip, you can split bills and settle debts here seamlessly.
                </p>
            </div>
        </div>
    );
}
