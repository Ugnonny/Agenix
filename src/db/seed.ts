import "dotenv/config";
import { db } from "./index";
import { agents, users } from "./schema";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("Seeding database...");
  
  const [user] = await db.insert(users).values({
    email: "creator@agenix.ai",
    name: "Agent Labs",
    walletAddress: "0x1234567890123456789012345678901234567890",
    balance: "1000.00",
  }).onConflictDoNothing().returning();

  let userId = user?.id;

  if (!userId) {
    const existing = await db.select().from(users).where(eq(users.email, "creator@agenix.ai")).limit(1);
    userId = existing[0].id;
    console.log("Using existing user:", userId);
  }

  await db.insert(agents).values([
    {
      name: "Solana Sniper AI",
      description: "Fastest autonomous trading bot on Solana. Detects new liquidity pools and snipes tokens with advanced rug-pull protection.",
      category: "Finance",
      creatorId: userId,
      pricePerTask: "0.1",
      pricePerMonth: "50",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
    },
    {
      name: "SocialPulse Agent",
      description: "Monitors Twitter, Reddit, and Discord 24/7. Generates engagement reports and drafts viral responses based on current trends.",
      category: "Content",
      creatorId: userId,
      pricePerTask: "0.05",
      pricePerMonth: "25",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop",
    },
    {
      name: "EthAudit Bot",
      description: "Deep security analysis of EVM smart contracts. Identifies reentrancy, integer overflow, and logic flaws in seconds.",
      category: "Security",
      creatorId: userId,
      pricePerTask: "2.5",
      imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop",
    },
    {
      name: "AutoPortfolio Optimizer",
      description: "Python-powered portfolio management agent. Rebalances your assets based on risk tolerance and real-time Canopy market data.",
      category: "Finance",
      creatorId: userId,
      pricePerTask: "1.0",
      pricePerMonth: "100",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bbda48658a7e?q=80&w=2940&auto=format&fit=crop",
      pluginType: "python",
      pluginCode: `def optimize(portfolio, risk_profile):
    # Agenix App-chain Strategy
    print(f"Optimizing for {risk_profile}")
    for asset in portfolio:
        asset['weight'] = 1.0 / len(portfolio)
    return portfolio`,
    }
  ]);

  console.log("Seeding complete.");
}

seed().catch(console.error);