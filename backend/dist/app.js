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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const allowedOrigins = [
    "http://localhost:3000", // local development
    "https://harmonious-nasturtium-35b1e4.netlify.app", // production frontend
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use("/auth", auth_routers_1.default);
app.use("/students", student_routers_1.default);
app.use("/classes", class_routers_1.default);
exports.default = app;
