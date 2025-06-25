import { Response } from "express";

interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T | null;
}

export const apiResponse = <T>(
  res: Response,
  statusCode: number,
  isSuccess: boolean,
  message: string,
  data: T | null = null
): Response<ApiResponse<T>> =>
  res.status(statusCode).json({
    isSuccess,
    message,
    data,
  });
