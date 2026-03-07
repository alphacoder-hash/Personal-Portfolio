"use client";

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RefreshButton() {
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        // Triggers a Next.js soft navigation server data refetch
        router.refresh();
        // Artificial UI delay for button feedback
        setTimeout(() => setIsRefreshing(false), 1200);
    };

    return (
        <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/80 border border-slate-600 rounded-lg text-sm font-bold text-slate-300 transition-all shadow-lg ${isRefreshing ? 'opacity-70 cursor-not-allowed border-cyan-500/50' : 'hover:border-cyan-400'}`}
        >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin text-cyan-400' : 'text-slate-400'} />
            {isRefreshing ? 'Syncing Now...' : 'Live Sync'}
        </button>
    );
}
