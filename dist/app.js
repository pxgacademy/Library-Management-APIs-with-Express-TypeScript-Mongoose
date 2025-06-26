"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const borrow_routes_1 = __importDefault(require("./routes/borrow.routes"));
const response_1 = require("./utils/response");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// book router
app.use("/api/books", book_routes_1.default);
// borrow router
app.use("/api/borrow", borrow_routes_1.default);
app.get("/", (req, res) => {
    res.status(200).send("I am working form assignment-3");
});
app.use((req, res) => {
    res
        .status(404)
        .json({ success: false, message: "Route not found", data: null });
});
app.use((error, req, res, next) => {
    if (error) {
        if (error.name === "ValidationError") {
            (0, response_1.errorResponse)(res, 400, "Validation failed", {
                name: error.name,
                errors: error.errors,
            });
        }
        else
            (0, response_1.errorResponse)(res, 500, "Internal server error", {
                name: error.name,
                message: error.message,
            });
        return;
    }
    (0, response_1.errorResponse)(res, 500, "Internal server error", {
        name: "Error",
        message: "No error was detected",
    });
});
exports.default = app;
