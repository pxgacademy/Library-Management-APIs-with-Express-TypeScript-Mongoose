"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.createBorrow = void 0;
const borrow_model_1 = require("../models/borrow.model");
const response_1 = require("../utils/response");
// create a single book
const createBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_model_1.Borrow.create(req.body);
        (0, response_1.apiResponse)(res, 201, true, "Book borrowed successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.createBorrow = createBorrow;
const getBorrowSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_model_1.Borrow.aggregate([
            { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo",
                },
            },
            {
                $unwind: "$bookInfo",
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn",
                    },
                },
            },
        ]);
        (0, response_1.apiResponse)(res, 200, true, "Borrowed books summary retrieved successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.getBorrowSummary = getBorrowSummary;
