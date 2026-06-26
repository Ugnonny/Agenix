import { pgTable, text, timestamp, uuid, integer, numeric, pgEnum } from "drizzle-orm/pg-core";

export const transactionTypeEnum = pgEnum("transaction_type", ["listing_fee", "subscription", "task", "rent"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  walletAddress: text("wallet_address"),
  balance: numeric("balance", { precision: 18, scale: 8 }).default("100.0").notNull(), // Mock balance
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const agents = pgTable("agents", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), 
  creatorId: uuid("creator_id").references(() => users.id).notNull(),
  pricePerTask: numeric("price_per_task", { precision: 18, scale: 8 }),
  pricePerMonth: numeric("price_per_month", { precision: 18, scale: 8 }),
  pricePerDay: numeric("price_per_day", { precision: 18, scale: 8 }),
  imageUrl: text("image_url"),
  pluginType: text("plugin_type").default("none"), // "none", "python", "javascript"
  pluginCode: text("plugin_code"),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  agentId: uuid("agent_id").references(() => agents.id).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  agentId: uuid("agent_id").references(() => agents.id),
  amount: numeric("amount", { precision: 18, scale: 8 }).notNull(),
  type: transactionTypeEnum("type").notNull(),
  status: text("status").default("completed").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  agentId: uuid("agent_id").references(() => agents.id).notNull(),
  type: text("type").notNull(), 
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});