import { Request, Response } from "express";
import { User } from "./user.model";
import httpsStatusCode from "http-status-codes";
import { UserSevices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const user = await UserSevices.createUser(req.body);
  res.status(httpsStatusCode.CREATED).send({
    message: "User created successfully",
    user,
  });
};
const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(httpsStatusCode.OK).send({
    message: "Users fetched successfully",
    users,
  });
};

export const UserController = {
  createUser,
  getUsers,
};
