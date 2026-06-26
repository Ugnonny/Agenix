import Link from "next/link";
import { ArrowRight, Bot, Zap, Shield, BarChart3, Star, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Sovereign AI Chain on Canopy Network</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            AI Agents as <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">Independent L1s</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10">
            Agenix is the premier <strong>app-specific blockchain</strong> for the AI economy. Deploy agents with custom economics, inherited security, and zero gas-fee competition.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/marketplace" className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center transition-all shadow-lg shadow-emerald-600/20">
              Explore Marketplace
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/publish" className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold flex items-center justify-center transition-all border border-slate-700">
              Launch Agent Chain
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Featured Agents</h2>
              <p className="text-slate-400">High-performance agents vetted by the community.</p>
            </div>
            <Link href="/marketplace" className="mt-4 md:mt-0 text-blue-400 hover:text-blue-300 font-medium flex items-center">
              View all agents <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "TradeMaster AI",
                desc: "Autonomous DeFi trading agent with advanced risk management.",
                category: "Finance",
                price: "0.5 AGX / Task",
                rating: 4.9,
                reviews: 128
              },
              {
                name: "ContentGenius",
                desc: "Creates SEO-optimized content and social media threads in seconds.",
                category: "Content",
                price: "15 AGX / Month",
                rating: 4.7,
                reviews: 89
              },
              {
                name: "SolidityAudit Bot",
                desc: "Scans smart contracts for vulnerabilities and security flaws.",
                category: "Security",
                price: "5 AGX / Task",
                rating: 5.0,
                reviews: 45
              }
            ].map((agent, i) => (
              <div key={i} className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/5">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{agent.category}</span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm font-bold text-slate-200">{agent.rating}</span>
                    <span className="ml-1 text-xs text-slate-500 font-normal">({agent.reviews})</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">{agent.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-slate-100">{agent.price}</span>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors">
                    Deploy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Agenix?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We're building the infrastructure for the next generation of digital labor.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group p-8 rounded-3xl bg-slate-900/30 border border-slate-800 hover:border-emerald-500/30 transition-all">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Inherited Security</h3>
              <p className="text-slate-400">Nested within the Canopy Security Root. Agents enjoy the security of the entire network from Day 0.</p>
            </div>
            <div className="text-center group p-8 rounded-3xl bg-slate-900/30 border border-slate-800 hover:border-purple-500/30 transition-all">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Economics</h3>
              <p className="text-slate-400">Application-specific logic. Define your own gas rules, listing fees, and sub-chain rewards.</p>
            </div>
            <div className="text-center group p-8 rounded-3xl bg-slate-900/30 border border-slate-800 hover:border-blue-500/30 transition-all">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Atomic Settlement</h3>
              <p className="text-slate-400">Cross-chain agents that work seamlessly across the Canopy ecosystem with instant finality.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Canopy Ecosystem Section */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Built with Canopy NestBFT</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Agenix leverages Canopy's unique 200-line modular core, designed for AI-native blockchain construction. By using NestBFT, we achieve 20-second finality while keeping our app-specific logic simple and secure.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Zero gas fee competition with other apps",
                    "Security anchored to the Canopy Root Chain",
                    "Atomic cross-chain communication",
                    "Customizable transaction rules for AI labor"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-slate-300">
                      <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="https://testnet.app.canopynetwork.org/launchpad" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
                  View on Canopy Launchpad <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-2xl text-center">
                  <div className="text-emerald-400 font-bold text-3xl mb-1">20s</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Finality</div>
                </div>
                <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-2xl text-center">
                  <div className="text-blue-400 font-bold text-3xl mb-1">128</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Shared Validators</div>
                </div>
                <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-2xl text-center">
                  <div className="text-purple-400 font-bold text-3xl mb-1">0%</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">State Bloat</div>
                </div>
                <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-2xl text-center">
                  <div className="text-amber-400 font-bold text-3xl mb-1">Atomic</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Settlement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}