"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./lib/db");
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => {
    (0, db_1.connectDB)();
    console.log(`I am listing form assignment-3 | port ${PORT}`);
});
