import { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { apiResponse } from "../utils/response";

// create a single book
export const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Borrow.create(req.body);
    apiResponse(res, 201, true, "Book borrowed successfully", result);
  } catch (error) {
    next(error);
  }
};

export const getBorrowSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error) {
    next(error);
  }
};
