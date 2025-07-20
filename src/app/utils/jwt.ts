import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import envVars from "../config/envvars.config";

export const generateToken = (
  payload: any,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);
};
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
