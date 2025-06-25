import { Response } from "express";

interface ErrorResponse {
  success: false;
  message: string;
  error: unknown;
}

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error: unknown
): Response<ErrorResponse> =>
  res.status(statusCode).json({ success: false, message, error });
