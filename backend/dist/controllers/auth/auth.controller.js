"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../../service/auth/auth.service");
const class_validator_1 = require("class-validator");
const dto_1 = require("../../validator/dto");
class AuthController {
    static async signup(req, res) {
        try {
            const dto = Object.assign(new dto_1.SignupDto(), req.body);
            await (0, class_validator_1.validateOrReject)(dto);
            const { accessToken, refreshToken, user } = await auth_service_1.AuthService.signup(dto);
            // Store refresh token in HTTP-only cookie
            res.cookie("accessToken", accessToken, {
                httpOnly: true, // safer
                secure: process.env.NODE_ENV === "production", // only https in prod
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.json({ accessToken, refreshToken, user });
        }
        catch (err) {
            res
                .status(400)
                .json({
                error: err instanceof Array ? err.map((e) => e.toString()) : err.message,
            });
        }
    }
    static async login(req, res) {
        try {
            const dto = Object.assign(new dto_1.LoginDto(), req.body);
            await (0, class_validator_1.validateOrReject)(dto);
            const { accessToken, refreshToken, user } = await auth_service_1.AuthService.login(dto);
            // Store refresh token in HTTP-only cookie
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.json({ accessToken, refreshToken, user });
        }
        catch (err) {
            res
                .status(400)
                .json({
                error: err instanceof Array ? err.map((e) => e.toString()) : err.message,
            });
        }
    }
    static async logout(req, res) {
        try {
            // Clear the refresh token cookie
            res.clearCookie("accessToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });
            res.json({ message: "Logged out successfully" });
        }
        catch (err) {
            res.status(500).json({ error: "Logout failed" });
        }
    }
    static async getUsers(req, res) {
        try {
            const users = await auth_service_1.AuthService.getAllUsers(); // implement this service
            res.json(users);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
exports.AuthController = AuthController;
