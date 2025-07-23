import envVars from "../config/envvars.config";
import { IUser } from "../modules/user/user.interfaces";
import { generateToken } from "./jwt";

export const createUserTokens = (user: Partial<IUser>) => {
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
  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );
  return {
    authToken,
    refreshToken,
  };
};
