"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controllers_1 = require("../controllers/borrow.controllers");
const borrowRoute = (0, express_1.Router)();
borrowRoute.post("/", borrow_controllers_1.createBorrow);
borrowRoute.get("/", borrow_controllers_1.getSummary);
exports.default = borrowRoute;
