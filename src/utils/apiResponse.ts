import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export const apiResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: T | null = null
): Response<ApiResponse<T>> =>
  res.status(statusCode).json({
    success,
    message,
    data,
  });
