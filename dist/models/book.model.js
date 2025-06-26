"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const book_types_1 = require("../types/book.types");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: { type: String, required: [true, "Author is required"] },
    genre: {
        type: String,
        enum: {
            values: Object.values(book_types_1.BookGenre),
            message: "Enter a valid genre, {VALUE} is invalid",
        },
        required: [true, "Genre is required"],
        uppercase: true,
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: [true, "ISBN is already exist, enter an unique ISBN"],
        // unique: true,
    },
    description: { type: String, default: "" },
    copies: {
        type: Number,
        required: [true, "Number of copies is required"],
        min: [1, "Copies cannot be negative, must be at least 1"],
    },
    available: { type: Boolean, required: [true, "Availability is required"] },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
