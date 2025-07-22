import { comparePassword } from "../../utils/hashPassword";
import { IUser } from "../user/user.interfaces";
import { User } from "../user/user.model";
import AppError from "../../utils/AppError";
import { generateToken } from "../../utils/jwt";
import envVars from "../../config/envvars.config";

const login = async (payload: Partial<IUser>) => {
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
  const authToken = generateToken(
    {
      email,
      id: user._id,
      role: user.role,
    },
    envVars.JWT_SECRET,
    envVars.JWT_EXPIRES_IN
  );
  return {
    authToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthServices = {
  login,
};

export default AuthServices;
