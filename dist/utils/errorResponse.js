"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const errorResponse = (res, statusCode, message, error) => res.status(statusCode).json({ success: false, message, error });
exports.errorResponse = errorResponse;
