"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
const apiResponse = (res, statusCode, success, message, data = null) => res.status(statusCode).json({
    success,
    message,
    data,
});
exports.apiResponse = apiResponse;
