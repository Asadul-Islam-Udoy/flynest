import { db } from "../../config/db";
import { users } from "../../drizzle/schema"
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../../utils/hash";
import { generateTokens } from "../../utils/jwt";

export class AuthService {
  static async signup(dto: any) {
    const passwordHash = await hashPassword(dto.password);
    const [user] = await db.insert(users).values({
      name: dto.name,
      email: dto.email,
      passwordHash,
      role: "student",
    }).returning();
    return generateTokens(user);
  }

  static async login(dto: any) {
    const [user] = await db.select().from(users).where(eq(users.email, dto.email));
    if (!user) throw new Error("Invalid credentials");

    const match = await comparePassword(dto.password, user.passwordHash);
    if (!match) throw new Error("Invalid credentials");

    return generateTokens(user);
  }

  static async getAllUsers() {
    const allUsers = await db.select().from(users);
    return allUsers;
  }
}
