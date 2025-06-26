import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { apiResponse, errorResponse } from "../utils/response";

// create a single book
export const createBook = async (req: Request, res: Response) => {
  try {
    const result = await Book.create(req.body);
    apiResponse(res, 201, true, "Book created successfully", result);
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.name === "ValidationError") {
      errorResponse(res, 400, "Validation failed", {
        name: error.name,
        errors: error.errors,
      });
    } else
      errorResponse(res, 500, "Internal server error", {
        name: error.name,
        message: error.message,
      });
  }
};

// get books
export const getAllBooks = async (req: Request, res: Response) => {
  // ?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
  const {
    filter,
    sortBy = "createdAt",
    sort = "desc",
    limit = "10",
  } = req.query;
  const query: Record<string, string> = {};
  if (filter) query.genre = filter as string;
  const SOrder = sort === "asc" ? 1 : -1;
  const limitNum = parseInt(limit as string);

  try {
    const result = await Book.find(query)
      .sort({ [sortBy as string]: SOrder })
      .limit(limitNum);

    apiResponse(res, 200, true, "Books retrieved successfully", result);
    // eslint-disable-next-line
  } catch (error: any) {
    errorResponse(res, 500, "Internal server error", {
      name: error.name,
      message: error.message,
    });
  }
};

// get book by ID
export const getBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    const result = await Book.findById(bookId);
    if (!result)
      return errorResponse(res, 404, "Book not found", {
        name: "Error",
        message: "Book not found",
      });

    apiResponse(res, 200, true, "Book retrieved successfully", result);
    // eslint-disable-next-line
  } catch (error: any) {
    errorResponse(res, 500, "Internal server error", {
      name: error.name,
      message: error.message,
    });
  }
};

// update a book by ID
export const updateBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const body = req.body;

  try {
    const result = await Book.findByIdAndUpdate(bookId, body, { new: true });
    if (!result)
      return errorResponse(res, 404, "Book not found", {
        name: "Error",
        message: "Book not found",
      });

    apiResponse(res, 200, true, "Book updated successfully", result);
    // eslint-disable-next-line
  } catch (error: any) {
    errorResponse(res, 500, "Internal server error", {
      name: error.name,
      message: error.message,
    });
  }
};

// delete a book by ID
export const deleteBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    const result = await Book.findOneAndDelete({ _id: bookId });
    if (!result)
      return errorResponse(res, 404, "Book not found", {
        name: "Error",
        message: "Book not found",
      });

    apiResponse(res, 200, true, "Book deleted successfully", null);
    // eslint-disable-next-line
  } catch (error: any) {
    errorResponse(res, 500, "Internal server error", {
      name: error.name,
      message: error.message,
    });
  }
};
