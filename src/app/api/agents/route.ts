import { db } from "@/db";
import { agents } from "@/db/schema";
import { getOrCreateTestUser } from "@/lib/auth-mock";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getOrCreateTestUser();
    const body = await req.json();
    
    const { name, description, category, pricePerTask, pricePerMonth, pricePerDay, imageUrl, pluginType, pluginCode } = body;
    
    if (!name || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Use Python Plugin verification if selected
    if (pluginType === "python" && pluginCode) {
      try {
        // We'll use the 'bash' tool equivalent in node (execSync)
        // But since we are inside a Route Handler, we can just use child_process
        const { execSync } = require('child_process');
        // Simple syntax check
        execSync(`python3 -c "import ast; ast.parse(${JSON.stringify(pluginCode)})"`);
      } catch (e: any) {
        return NextResponse.json({ error: "Python Syntax Error: " + e.message }, { status: 400 });
      }
    }

    const [newAgent] = await db.insert(agents).values({
      name,
      description,
      category,
      creatorId: user.id,
      pricePerTask: pricePerTask ? pricePerTask.toString() : null,
      pricePerMonth: pricePerMonth ? pricePerMonth.toString() : null,
      pricePerDay: pricePerDay ? pricePerDay.toString() : null,
      imageUrl: imageUrl || null,
      pluginType: pluginType || "none",
      pluginCode: pluginCode || null,
    }).returning();

    return NextResponse.json(newAgent);
  } catch (error: any) {
    console.error("Error creating agent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allAgents = await db.select().from(agents);
    return NextResponse.json(allAgents);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}