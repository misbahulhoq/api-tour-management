import { IUser } from "../user/user.interfaces";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import { comparePassword } from "../../utils/hashPassword";

export const login = async (payload: Partial<IUser>) => {
  const { email } = payload;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isValidPassword = await comparePassword(
    payload.password as string,
    user.password as string
  );
  return {
    authToken: jwt.sign({ email }, process.env.JWT_SECRET || "something", {
      expiresIn: "30d",
    }),
  };
};

export default login;
