"use client";

import { useState } from "react";
import { CreditCard, Loader2, CheckCircle2 } from "lucide-react";

export default function AgentActions({ agentId, prices }: { agentId: string, prices: { task?: string | null, month?: string | null, day?: string | null } }) {
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    // Simulate a blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPurchased(true);
    setLoading(false);
  };

  if (purchased) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/50 p-6 rounded-2xl flex flex-col items-center text-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-2" />
        <h3 className="font-bold text-emerald-400">Subscription Active</h3>
        <p className="text-xs text-slate-400 mt-1">You can now start using this agent in your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      {prices.task && (
        <button 
          onClick={handlePurchase}
          disabled={loading}
          className="w-full p-4 border border-blue-500/30 bg-blue-500/5 rounded-xl flex items-center justify-between hover:bg-blue-500/10 transition-all text-left group"
        >
          <div>
            <span className="block font-bold">Pay per Task</span>
            <span className="text-xs text-slate-400">Best for one-off jobs</span>
          </div>
          <span className="font-bold text-blue-400">{prices.task} AGX</span>
        </button>
      )}
      
      {prices.month && (
        <button 
          onClick={handlePurchase}
          disabled={loading}
          className="w-full p-4 border border-slate-800 hover:border-blue-500/30 hover:bg-blue-500/5 rounded-xl flex items-center justify-between transition-all text-left group"
        >
          <div>
            <span className="block font-bold">Subscription</span>
            <span className="text-xs text-slate-400">Unlimited monthly use</span>
          </div>
          <span className="font-bold text-slate-200 group-hover:text-blue-400">{prices.month} AGX/mo</span>
        </button>
      )}

      {prices.day && (
        <button 
          onClick={handlePurchase}
          disabled={loading}
          className="w-full p-4 border border-slate-800 hover:border-blue-500/30 hover:bg-blue-500/5 rounded-xl flex items-center justify-between transition-all text-left group"
        >
          <div>
            <span className="block font-bold">Daily Rental</span>
            <span className="text-xs text-slate-400">24h access</span>
          </div>
          <span className="font-bold text-slate-200 group-hover:text-blue-400">{prices.day} AGX/day</span>
        </button>
      )}

      <button 
        onClick={handlePurchase}
        disabled={loading}
        className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center mt-4"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <CreditCard className="w-5 h-5 mr-2" />
        )}
        {loading ? "Confirming..." : "Get Started Now"}
      </button>
    </div>
  );
}