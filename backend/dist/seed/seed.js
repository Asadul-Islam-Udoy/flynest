"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
// scripts/seed.ts
const db_1 = require("../config/db");
const schema_1 = require("../drizzle/schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function seed() {
    try {
        // Check if users table is empty
        const existingUsers = await db_1.db.select().from(schema_1.users).limit(1);
        if (existingUsers.length === 0) {
            const password = await bcryptjs_1.default.hash("admin123", 10);
            await db_1.db.insert(schema_1.users).values({
                name: "Admin",
                email: "admin@school.com",
                passwordHash: password,
                role: "admin",
            });
            console.log("✅ Admin user created");
        }
        else {
            console.log("ℹ️ Users already exist, skipping user seed");
        }
        // Check if classes table is empty
        const existingClasses = await db_1.db.select().from(schema_1.classes).limit(1);
        if (existingClasses.length === 0) {
            await db_1.db.insert(schema_1.classes).values([
                { name: "Math", section: "A" },
                { name: "Science", section: "B" },
            ]);
            console.log("✅ Classes created");
        }
        else {
            console.log("ℹ️ Classes already exist, skipping class seed");
        }
        console.log("🎉 Seed complete");
    }
    catch (err) {
        console.error("❌ Seed failed:", err);
    }
}
