"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Upload, AlertCircle, CheckCircle2, DollarSign, Tag, FileText, Zap } from "lucide-react";

export default function PublishPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category"),
      pricePerTask: formData.get("pricePerTask"),
      pricePerMonth: formData.get("pricePerMonth"),
      pricePerDay: formData.get("pricePerDay"),
      imageUrl: formData.get("imageUrl"),
    };

    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to publish agent");

      setSuccess(true);
      setTimeout(() => router.push("/marketplace"), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Agent Published!</h1>
        <p className="text-slate-400">Your agent is now live on the marketplace.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Launch Agent App-Chain</h1>
        <p className="text-slate-400">Deploy your agent as a sovereign nested chain on Canopy with custom economics.</p>
        
        <div className="mt-6 flex items-center space-x-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
           <div className="flex -space-x-2">
             {[1, 2, 3].map(i => (
               <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                 {i === 1 ? 'S' : i === 2 ? 'C' : 'A'}
               </div>
             ))}
           </div>
           <p className="text-xs text-slate-400 italic">
             "Agenix uses <strong>Progressive Sovereignty</strong>. Your agent starts with shared security and can graduate to a full L1."
           </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-lg flex items-center space-x-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
              <Bot className="w-4 h-4 mr-2 text-blue-400" />
              Agent Name
            </label>
            <input
              required
              name="name"
              type="text"
              placeholder="e.g. GPT-4 Code Architect"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
              <Tag className="w-4 h-4 mr-2 text-blue-400" />
              Category
            </label>
            <select
              required
              name="category"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="Finance">Finance</option>
              <option value="Content">Content</option>
              <option value="Coding">Coding</option>
              <option value="Security">Security</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-blue-400" />
              Description
            </label>
            <textarea
              required
              name="description"
              rows={4}
              placeholder="Describe what your agent does, its capabilities, and how to use it..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-emerald-400" />
                Price/Task (AGX)
              </label>
              <input
                name="pricePerTask"
                type="number"
                step="0.00000001"
                placeholder="0.5"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-emerald-400" />
                Price/Month (AGX)
              </label>
              <input
                name="pricePerMonth"
                type="number"
                step="0.00000001"
                placeholder="10"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-emerald-400" />
                Price/Day (AGX)
              </label>
              <input
                name="pricePerDay"
                type="number"
                step="0.00000001"
                placeholder="1"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
              <Upload className="w-4 h-4 mr-2 text-blue-400" />
              Image URL (Optional)
            </label>
            <input
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.png"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Agent Logic Plugin
            </h3>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">Runtime Environment</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="pluginType" value="none" defaultChecked className="text-blue-500 bg-slate-900 border-slate-700" />
                    <span className="text-sm">No Code</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="pluginType" value="python" className="text-blue-500 bg-slate-900 border-slate-700" />
                    <span className="text-sm text-blue-400 font-bold">Python 3.10</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Plugin Source Code</label>
                <textarea
                  name="pluginCode"
                  rows={6}
                  placeholder="def run_agent(input_data):&#10;    # Your Canopy app-chain logic here&#10;    return {'status': 'success', 'data': input_data}"
                  className="w-full bg-black border border-slate-800 rounded-lg p-4 font-mono text-xs text-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <p className="text-[10px] text-slate-500 italic">
                  Python code will be verified and deployed to your agent's sovereign nested chain.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-600/20 flex flex-col items-center justify-center leading-tight"
        >
          <span>{isSubmitting ? "Deploying App-Chain..." : "Deploy to Canopy Network"}</span>
          {!isSubmitting && <span className="text-[10px] opacity-70 font-normal mt-1 uppercase tracking-widest">Inherits Security Root #4</span>}
        </button>
      </form>
    </div>
  );
}