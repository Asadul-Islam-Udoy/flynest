import { Request, Response } from "express";
import { AuthService } from "../../service/auth/auth.service";
import { validateOrReject } from "class-validator";
import { SignupDto, LoginDto } from "../../validator/dto";

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const dto = Object.assign(new SignupDto(), req.body);
      await validateOrReject(dto);

      const { accessToken, refreshToken, user } = await AuthService.signup(dto);

      // Store refresh token in HTTP-only cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true, // safer
        secure: process.env.NODE_ENV === "production", // only https in prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken, refreshToken, user });
    } catch (err: any) {
      res
        .status(400)
        .json({
          error:
            err instanceof Array ? err.map((e) => e.toString()) : err.message,
        });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const dto = Object.assign(new LoginDto(), req.body);
      await validateOrReject(dto);

      const { accessToken, refreshToken, user } = await AuthService.login(dto);

      // Store refresh token in HTTP-only cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken, refreshToken, user });
    } catch (err: any) {
      res
        .status(400)
        .json({
          error:
            err instanceof Array ? err.map((e) => e.toString()) : err.message,
        });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      // Clear the refresh token cookie
      res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      res.json({ message: "Logged out successfully" });
    } catch (err) {
      res.status(500).json({ error: "Logout failed" });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await AuthService.getAllUsers(); // implement this service
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
