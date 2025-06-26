import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { apiResponse } from "../utils/apiResponse";
import { errorResponse } from "../utils/errorResponse";

// create a single book
export const createBorrow = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const result = await Borrow.create(body);
    apiResponse(res, 201, true, "Book borrowed successfully", result);
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

export const getSummary = async (req: Request, res: Response) => {
  try {
    const result = await Borrow.aggregate([
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

    apiResponse(
      res,
      200,
      true,
      "Borrowed books summary retrieved successfully",
      result
    );

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
