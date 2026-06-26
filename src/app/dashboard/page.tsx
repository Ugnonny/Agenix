import { db } from "@/db";
import { agents, subscriptions, transactions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getOrCreateTestUser } from "@/lib/auth-mock";
import { Bot, CreditCard, LayoutDashboard, PlusCircle, TrendingUp, DollarSign, ArrowUpRight, Shield } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getDashboardData() {
  const user = await getOrCreateTestUser();
  
  const myAgents = await db.select().from(agents).where(eq(agents.creatorId, user.id)).orderBy(desc(agents.createdAt));
  
  const userTransactions = await db.select().from(transactions).where(eq(transactions.userId, user.id)).orderBy(desc(transactions.createdAt)).limit(5);

  const activeSubscriptions = await db.select({
    sub: subscriptions,
    agent: agents
  })
  .from(subscriptions)
  .leftJoin(agents, eq(subscriptions.agentId, agents.id))
  .where(eq(subscriptions.userId, user.id));

  return { user, myAgents, transactions: userTransactions, subscriptions: activeSubscriptions };
}

export default async function DashboardPage() {
  const { user, myAgents, transactions: userTransactions, subscriptions: activeSubs } = await getDashboardData();

  const totalEarnings = myAgents.length * 15.5; // Mock calculation

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-400">Manage your agents, subscriptions, and earnings.</p>
        </div>
        <Link href="/publish" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all">
          <PlusCircle className="w-5 h-5" />
          <span>Publish New Agent</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4 text-slate-400">
            <span className="text-sm font-medium text-emerald-400 uppercase tracking-wider font-bold">Wallet Balance</span>
            <CreditCard className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">{user.balance} AGX</div>
          <div className="mt-2 text-xs text-emerald-500/70 font-medium">≈ $420.69 USD</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4 text-slate-400">
            <span className="text-sm font-medium text-blue-400 uppercase tracking-wider font-bold">Block Height</span>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">#1,402,948</div>
          <div className="mt-2 text-xs text-blue-500/70 font-medium flex items-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
            NestBFT Finality: 20s
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4 text-slate-400">
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wider font-bold">Security Root</span>
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">Canopy Main</div>
          <div className="mt-2 text-xs text-purple-500/70 font-medium">Shared Validators: 128 Active</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4 text-slate-400">
            <span className="text-sm font-medium text-amber-400 uppercase tracking-wider font-bold">Marketplace Fee</span>
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100">2.5%</div>
          <div className="mt-2 text-xs text-amber-500/70 font-medium">Custom App-chain Rule</div>
        </div>
      </div>

      {/* App-chain Stats Banner */}
      <div className="mb-12 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-500/20 p-2 rounded-lg">
            <Bot className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-200">Agenix App-Chain Status</p>
            <p className="text-xs text-slate-500">Nested under Canopy Security Root #4</p>
          </div>
        </div>
        <div className="flex space-x-8">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold">TPS</span>
            <span className="text-sm font-mono text-emerald-400">2,400+</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Sub-Chain Rank</span>
            <span className="text-sm font-mono text-emerald-400">#12</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Active Agents</span>
            <span className="text-sm font-mono text-emerald-400">{myAgents.length + 42}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Published Agents */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">My Published Agents</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            {myAgents.length > 0 ? (
              <div className="divide-y divide-slate-800">
                {myAgents.map((agent) => (
                  <div key={agent.id} className="p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <Bot className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold">{agent.name}</h3>
                        <p className="text-xs text-slate-500">{agent.category} • {agent.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="hidden sm:flex flex-col items-end">
                        <span className="text-sm font-bold">12.4 AGX</span>
                        <span className="text-[10px] text-slate-500 uppercase">Earned</span>
                      </div>
                      <Link href={`/agents/${agent.id}`} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <ArrowUpRight className="w-5 h-5 text-slate-400" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-slate-500 mb-6 italic">You haven't published any agents yet.</p>
                <Link href="/publish" className="text-blue-400 hover:text-blue-300 font-medium">Start building your agent empire</Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="space-y-6">
              {userTransactions.length > 0 ? (
                userTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{tx.type.replace('_', ' ')}</p>
                      <p className="text-[10px] text-slate-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="text-sm font-bold text-slate-200">-{tx.amount} AGX</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-500 italic">No recent activity</p>
                </div>
              )}
              
              {/* Dummy data if no real transactions */}
              {userTransactions.length === 0 && (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">Listing Fee - TradeMaster AI</p>
                      <p className="text-[10px] text-slate-500">Jan 12, 2024</p>
                    </div>
                    <span className="text-sm font-bold text-red-400">-5.00 AGX</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">Reward - Beta Testing</p>
                      <p className="text-[10px] text-slate-500">Jan 10, 2024</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-400">+10.00 AGX</span>
                  </div>
                </>
              )}
            </div>
            <button className="w-full mt-8 py-2 text-xs font-bold text-slate-400 hover:text-white border border-slate-800 rounded-lg transition-colors">
              View All History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}