"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controllers_1 = require("../controllers/book.controllers");
const bookRoute = (0, express_1.Router)();
// create a single book
bookRoute.post("/", book_controllers_1.createBook);
bookRoute.get("/", book_controllers_1.getAllBooks);
bookRoute.get("/:bookId", book_controllers_1.getBookById);
bookRoute.patch("/:bookId", book_controllers_1.updateBookById);
bookRoute.delete("/:bookId", book_controllers_1.deleteBookById);
exports.default = bookRoute;
