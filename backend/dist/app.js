"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routers_1 = __importDefault(require("./routers/auth/auth.routers"));
const cors_1 = __importDefault(require("cors"));
const student_routers_1 = __importDefault(require("./routers/students/student.routers"));
const class_routers_1 = __importDefault(require("./routers/classes/class.routers"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config({ path: '.env' });
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL // Use domain from .env in production
        : 'http://localhost:3000', // The frontend URL
    credentials: true, // Allow sending cookies with cross-origin requests
};
app.use((0, cors_1.default)(corsOptions));
app.use("/auth", auth_routers_1.default);
app.use("/students", student_routers_1.default);
app.use("/classes", class_routers_1.default);
exports.default = app;
