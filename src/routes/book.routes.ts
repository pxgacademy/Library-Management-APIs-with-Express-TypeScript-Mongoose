import { Router } from "express";
import {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../controllers/book.controllers";

const bookRoute = Router();

// create a single book
bookRoute.post("/", createBook);
bookRoute.get("/", getAllBooks);
bookRoute.get("/:bookId", getBookById);
bookRoute.patch("/:bookId", updateBookById);
bookRoute.delete("/:bookId", deleteBookById);

export default bookRoute;
