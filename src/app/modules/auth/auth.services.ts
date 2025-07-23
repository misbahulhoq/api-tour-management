import { comparePassword } from "../../utils/hashPassword";
import { IUser } from "../user/user.interfaces";
import { User } from "../user/user.model";
import AppError from "../../utils/AppError";
import {
  createNewAccessTokenByRefreshToken,
  createUserTokens,
} from "../../utils/userTokens";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  if (!email || !password) {
    throw new AppError(400, "Email and password are required.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const isValidPassword = await comparePassword(
    password,
    user.password as string
  );
  if (!isValidPassword) {
    throw new AppError(400, "Invalid email or password.");
  }
  const plainUser = user.toObject();
  delete plainUser.password;

  const tokenInfo = createUserTokens(user);

  return {
    tokenInfo,
    user: plainUser,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenByRefreshToken(refreshToken);
  return newAccessToken;
};

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
};

export default AuthServices;
