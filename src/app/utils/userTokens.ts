import { JwtPayload } from "jsonwebtoken";
import envVars from "../config/envvars.config";
import { IsActive, IUser } from "../modules/user/user.interfaces";
import { User } from "../modules/user/user.model";
import AppError from "./AppError";
import { generateToken, verifyToken } from "./jwt";
import httpStatus from "http-status-codes";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = {
    email: user.email,
    userId: user._id,
    role: user.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );
  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenByRefreshToken = async (
  refreshToken: string
) => {
  const verifiedToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const user = await User.findOne({ email: verifiedToken.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (verifiedToken.role !== user.role) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
  if (
    user.isActive === IsActive.INACTIVE ||
    user.isActive === IsActive.BLOCKED ||
    user.isDeleted
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
  const jwtPayload = {
    email: user.email,
    userId: user._id,
    role: user.role,
  };

  const authToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );
  return authToken;
};
