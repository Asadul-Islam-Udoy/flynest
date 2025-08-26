"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = require("../../config/db");
const schema_1 = require("../../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const hash_1 = require("../../utils/hash");
const jwt_1 = require("../../utils/jwt");
class AuthService {
    static async signup(dto) {
        const passwordHash = await (0, hash_1.hashPassword)(dto.password);
        const [user] = await db_1.db.insert(schema_1.users).values({
            name: dto.name,
            email: dto.email,
            passwordHash,
            role: "student",
        }).returning();
        return (0, jwt_1.generateTokens)(user);
    }
    static async login(dto) {
        const [user] = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, dto.email));
        if (!user)
            throw new Error("Invalid credentials");
        const match = await (0, hash_1.comparePassword)(dto.password, user.passwordHash);
        if (!match)
            throw new Error("Invalid credentials");
        return (0, jwt_1.generateTokens)(user);
    }
    static async getAllUsers() {
        const allUsers = await db_1.db.select().from(schema_1.users);
        return allUsers;
    }
}
exports.AuthService = AuthService;
