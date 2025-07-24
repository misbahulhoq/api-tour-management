import { Request, Response, NextFunction } from "express";
export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const success = false;
  let message: string | string[] = "Internal server error";
  let statusCode = 500;
  console.log(error);
  if (error.code === 11000) {
    message = "Email already exists";
    console.log(error);
  } else if (error.name === "ValidationError") {
    message = Object.values(error.errors);
  } else if (error.name === "CastError") {
    message = "Invalid id format";
    statusCode = 400;
  } else if (error instanceof Error) {
    statusCode = error.statusCode;
    message = error.message;
  } else {
    res.status(statusCode).send({
      success,
      message: "Internal server error",
      error,
      stack: process.env.NODE_ENV === "development" ? error.stack : null,
    });
  }

  res.status(statusCode).send({
    success,
    message,
    error,
    stack: process.env.NODE_ENV === "development" ? error.stack : null,
  });
};
