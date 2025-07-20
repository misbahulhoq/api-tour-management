// utils/AppError.ts

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    // Maintains proper stack trace for where the error was thrown (only in V8)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
