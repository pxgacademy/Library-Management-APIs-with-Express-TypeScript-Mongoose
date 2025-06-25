import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { apiResponse } from "../utils/apiResponse";
import { errorResponse } from "../utils/errorResponse";

// create a single book
export const createBook = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const result = await Book.create(body);
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
  try {
    const { filter, sortBy = "createdAt", sort = "desc", limit } = req.query;
    // eslint-disable-next-line
    const query: Record<string, any> = {};

    if (filter) query.genre = filter;
    const SOrder = sort === "asc" ? 1 : -1;
    const limitNum = parseInt(limit as string) || 10;

    const result = await Book.find(query)
      .sort({ [sortBy as string]: SOrder })
      .limit(limitNum);

    apiResponse(res, 200, true, "Books retrieved successfully", result);
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

// get book by ID
export const getBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    const result = await Book.findById(bookId);
    apiResponse(res, 200, true, "", result);
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
