"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controllers_1 = require("../controllers/book.controllers");
const bookRouter = (0, express_1.Router)();
// create a single book
bookRouter.post("/", book_controllers_1.createBook);
bookRouter.get("/", book_controllers_1.getAllBooks);
bookRouter.get("/:bookId", book_controllers_1.getBookById);
bookRouter.patch("/:bookId", book_controllers_1.updateBookById);
bookRouter.delete("/:bookId", book_controllers_1.deleteBookById);
exports.default = bookRouter;
