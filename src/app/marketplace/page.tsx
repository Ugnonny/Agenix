import { db } from "@/db";
import { agents, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Bot, Star, Search, Filter, SlidersHorizontal } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getAgents() {
  const allAgents = await db.select({
    id: agents.id,
    name: agents.name,
    description: agents.description,
    category: agents.category,
    pricePerTask: agents.pricePerTask,
    pricePerMonth: agents.pricePerMonth,
    imageUrl: agents.imageUrl,
    creatorName: users.name,
  })
  .from(agents)
  .leftJoin(users, eq(agents.creatorId, users.id))
  .orderBy(desc(agents.createdAt));
  
  return allAgents;
}

export default async function MarketplacePage() {
  const agentList = await getAgents();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-emerald-50">Agenix Marketplace</h1>
          <p className="text-slate-400 font-medium">Verified AI nested chains on the Canopy ecosystem.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search agents..." 
              className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <button className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentList.length > 0 ? (
          agentList.map((agent) => (
            <Link key={agent.id} href={`/agents/${agent.id}`} className="group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all flex flex-col">
              <div className="aspect-square bg-slate-800 relative overflow-hidden">
                {agent.imageUrl ? (
                  <img src={agent.imageUrl} alt={agent.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Bot className="w-16 h-16 text-slate-700" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  {agent.category}
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{agent.name}</h3>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="ml-1 font-bold">4.8</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mb-4 line-clamp-2">
                  {agent.description}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Price from</span>
                    <span className="font-bold text-sm text-slate-200">
                      {agent.pricePerTask ? `${agent.pricePerTask} AGX` : agent.pricePerMonth ? `${agent.pricePerMonth} AGX/mo` : "Custom"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    by <span className="text-slate-300 font-medium">{agent.creatorName || "Anonymous"}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-slate-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">No agents found</h3>
            <p className="text-slate-400 mb-8">Be the first to publish an agent on the marketplace.</p>
            <Link href="/publish" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all">
              Publish Agent
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}