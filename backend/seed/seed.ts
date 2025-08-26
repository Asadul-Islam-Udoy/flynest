// scripts/seed.ts
import { db } from "../config/db";
import { users, classes } from "../drizzle/schema";
import bcrypt from "bcryptjs";

export async function seed() {
  try {
    // Check if users table is empty
    const existingUsers = await db.select().from(users).limit(1);
    if (existingUsers.length === 0) {
      const password = await bcrypt.hash("admin123", 10);
      await db.insert(users).values({
        name: "Admin",
        email: "admin@school.com",
        passwordHash: password,
        role: "admin",
      });
      console.log("✅ Admin user created");
    } else {
      console.log("ℹ️ Users already exist, skipping user seed");
    }

    // Check if classes table is empty
    const existingClasses = await db.select().from(classes).limit(1);
    if (existingClasses.length === 0) {
      await db.insert(classes).values([
        { name: "Math", section: "A" },
        { name: "Science", section: "B" },
      ]);
      console.log("✅ Classes created");
    } else {
      console.log("ℹ️ Classes already exist, skipping class seed");
    }

    console.log("🎉 Seed complete");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  }
}
