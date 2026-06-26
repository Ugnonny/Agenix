import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getOrCreateTestUser() {
  const testEmail = "demo@agenix.ai";
  
  const existingUser = await db.select().from(users).where(eq(users.email, testEmail)).limit(1);
  
  if (existingUser.length > 0) {
    return existingUser[0];
  }
  
  const [newUser] = await db.insert(users).values({
    email: testEmail,
    name: "Demo User",
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    balance: "100.00",
  }).returning();
  
  return newUser;
}