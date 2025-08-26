"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const seed_1 = require("./seed/seed");
dotenv_1.default.config({ path: '.env' });
const PORT = process.env.PORT || 8000;
async function startServer() {
    await (0, db_1.connectDB)();
    await (0, seed_1.seed)(); // run seed after DB connection
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}
startServer();
