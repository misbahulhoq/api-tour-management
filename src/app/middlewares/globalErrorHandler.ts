import { Request, Response, NextFunction } from "express";
export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({
    message: error.message || "Internal server error",
    error,
    stack: process.env.NODE_ENV === "development" ? error.stack : null,
  });
};
