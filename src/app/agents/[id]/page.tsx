import { db } from "@/db";
import { agents, users, reviews } from "@/db/schema";
import { eq, avg, count } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Bot, Star, Shield, Clock, Zap, MessageSquare, CreditCard, ExternalLink } from "lucide-react";
import Link from "next/link";
import AgentActions from "./agent-actions";

export const dynamic = 'force-dynamic';

async function getAgent(id: string) {
  const agentData = await db.select({
    agent: agents,
    creator: users,
  })
  .from(agents)
  .leftJoin(users, eq(agents.creatorId, users.id))
  .where(eq(agents.id, id))
  .limit(1);

  if (agentData.length === 0) return null;

  const agentReviews = await db.select()
    .from(reviews)
    .where(eq(reviews.agentId, id));

  return { ...agentData[0], reviews: agentReviews };
}

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const data = await getAgent(params.id);

  if (!data) {
    notFound();
  }

  const { agent, creator, reviews: agentReviews } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                <Bot className="w-10 h-10 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{agent.name}</h1>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                    {agent.category}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 font-bold text-slate-200">4.8</span>
                    <span className="ml-1 text-slate-500">({agentReviews.length} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              {agent.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <Shield className="w-6 h-6 text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Verified Agent</h3>
              <p className="text-[10px] text-slate-500 text-slate-400">Security audited and performance verified onchain.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <Clock className="w-6 h-6 text-emerald-400 mb-4" />
              <h3 className="font-bold mb-2">99.9% Uptime</h3>
              <p className="text-[10px] text-slate-500 text-slate-400">Deployed on decentralized compute for maximum reliability.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <Zap className="w-6 h-6 text-purple-400 mb-4" />
              <h3 className="font-bold mb-2">NestBFT Finality</h3>
              <p className="text-[10px] text-slate-500 text-slate-400">Atomic settlements with 20s block times for rapid AI interactions.</p>
            </div>
            {agent.pluginType === 'python' && (
              <div className="bg-blue-500/5 border border-blue-500/30 p-6 rounded-2xl">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[10px] font-bold text-white">Py</span>
                </div>
                <h3 className="font-bold mb-2 text-blue-400">Python 3.10</h3>
                <p className="text-[10px] text-blue-300">Sovereign logic plugin active and verified by Canopy Root.</p>
              </div>
            )}
          </div>

          {agent.pluginCode && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <ExternalLink className="w-5 h-5 mr-2 text-slate-500" />
                Plugin Logic
              </h3>
              <div className="bg-black border border-slate-800 rounded-xl p-6 relative group overflow-hidden">
                <div className="absolute top-4 right-4 text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded">
                  Verified Code
                </div>
                <pre className="font-mono text-xs text-blue-300 overflow-x-auto">
                  <code>{agent.pluginCode}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="pt-8 border-t border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Reviews</h2>
              <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Write a review
              </button>
            </div>
            
            <div className="space-y-6">
              {agentReviews.length > 0 ? (
                agentReviews.map((review) => (
                  <div key={review.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-slate-700"}`} />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">2 days ago</span>
                    </div>
                    <p className="text-slate-300 text-sm italic mb-4">"{review.comment}"</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-bold">U</span>
                      </div>
                      <span className="text-xs font-medium text-slate-400">User_4829</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No reviews yet. Be the first to try it!</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Actions */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl sticky top-24">
            <h3 className="text-xl font-bold mb-6">Choose Plan</h3>
            
            <AgentActions 
              agentId={agent.id} 
              prices={{
                task: agent.pricePerTask,
                month: agent.pricePerMonth,
                day: agent.pricePerDay
              }} 
            />
            <p className="text-[10px] text-center text-slate-500">
              Payments are secured by smart contracts. Funds are only released upon successful task verification.
            </p>

            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-slate-400">Creator</span>
                <span className="text-slate-200 font-medium">{creator?.name || "Anonymous"}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-slate-400">Total Runs</span>
                <span className="text-slate-200 font-medium">1,204</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Marketplace Fee</span>
                <span className="text-emerald-400 font-medium">2.5%</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h4 className="font-bold mb-4 flex items-center text-sm">
              <ExternalLink className="w-4 h-4 mr-2 text-blue-400" />
              Integration
            </h4>
            <div className="bg-slate-950 p-4 rounded-lg font-mono text-[10px] text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap">
              curl -X POST https://api.agenix.ai/v1/run/{agent.id}
            </div>
            <p className="text-[10px] mt-2 text-slate-500 italic">
              API documentation available on our developer portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}