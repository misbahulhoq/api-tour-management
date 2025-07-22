import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import envVars from "../config/envvars.config";
import AppError from "../utils/AppError";
import { verifyToken } from "../utils/jwt";
export const checkAuth = (...authRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new AppError(401, "Unauthorized");
    }
    const verifiedToken = verifyToken(
      authToken,
      envVars.JWT_SECRET
    ) as JwtPayload;
    if (!authRoles.includes(verifiedToken.role)) {
      throw new AppError(401, "Unauthorized");
    }
    console.log(verifiedToken);
    next();
  };
};
