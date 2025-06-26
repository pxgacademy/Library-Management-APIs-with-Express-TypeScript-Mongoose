"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controllers_1 = require("../controllers/borrow.controllers");
const borrowRouter = (0, express_1.Router)();
borrowRouter.post("/", borrow_controllers_1.createBorrow);
borrowRouter.get("/", borrow_controllers_1.getBorrowSummary);
exports.default = borrowRouter;
