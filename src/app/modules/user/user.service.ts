import { IUser } from "./user.interfaces";
import { User } from "./user.model";
import hashPassword from "../../utils/hashPassword";
import AppError from "../../utils/AppError";
import https from "http-status-codes";
import { generateToken } from "../../utils/jwt";
import envVars from "../../config/envvars.config";
const createUser = async (payload: Partial<IUser>) => {
  const { email } = payload;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError(https.CONFLICT, "User already exists");
  }
  const password = await hashPassword(payload.password as string);
  payload.password = password;

  payload.auths = [{ provider: "email", providerId: email as string }];
  const user = await User.create(payload);

  const authToken = generateToken(
    { email, id: user._id },
    envVars.JWT_SECRET,
    envVars.JWT_EXPIRES_IN
  );

  return { authToken };
};

export const UserSevices = {
  createUser,
};
