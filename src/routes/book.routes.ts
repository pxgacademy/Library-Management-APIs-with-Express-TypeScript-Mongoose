import { Router } from "express";
import {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../controllers/book.controllers";

const bookRouter = Router();

// create a single book
bookRouter.post("/", createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:bookId", getBookById);
bookRouter.patch("/:bookId", updateBookById);
bookRouter.delete("/:bookId", deleteBookById);

export default bookRouter;
