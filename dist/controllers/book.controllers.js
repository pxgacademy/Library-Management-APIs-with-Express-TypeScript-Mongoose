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
exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const response_1 = require("../utils/response");
// create a single book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_model_1.Book.create(req.body);
        (0, response_1.apiResponse)(res, 201, true, "Book created successfully", result);
    }
    catch (error) {
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
    }
});
exports.createBook = createBook;
// get books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
    const { filter, sortBy = "createdAt", sort = "desc", limit = "10", } = req.query;
    const query = {};
    if (filter)
        query.genre = filter;
    const SOrder = sort === "asc" ? 1 : -1;
    const limitNum = parseInt(limit);
    try {
        const result = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: SOrder })
            .limit(limitNum);
        (0, response_1.apiResponse)(res, 200, true, "Books retrieved successfully", result);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, 500, "Internal server error", {
            name: error.name,
            message: error.message,
        });
    }
});
exports.getAllBooks = getAllBooks;
// get book by ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const result = yield book_model_1.Book.findById(bookId);
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "Book not found", {
                name: "Error",
                message: "Book not found",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "Book retrieved successfully", result);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, 500, "Internal server error", {
            name: error.name,
            message: error.message,
        });
    }
});
exports.getBookById = getBookById;
// update a book by ID
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const body = req.body;
    try {
        const result = yield book_model_1.Book.findOneAndUpdate({ _id: bookId }, body, {
            new: true,
        });
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "Book not found", {
                name: "Error",
                message: "Book not found",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "Book updated successfully", result);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, 500, "Internal server error", {
            name: error.name,
            message: error.message,
        });
    }
});
exports.updateBookById = updateBookById;
// delete a book by ID
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const result = yield book_model_1.Book.findOneAndDelete({ _id: bookId });
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "Book not found", {
                name: "Error",
                message: "Book not found",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "Book deleted successfully", null);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, 500, "Internal server error", {
            name: error.name,
            message: error.message,
        });
    }
});
exports.deleteBookById = deleteBookById;
