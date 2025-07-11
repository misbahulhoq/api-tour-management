import { Request, Response } from "express";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.send({
    message: "User created successfully",
    user,
  });
};

export const UserController = {
  createUser,
};
