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
