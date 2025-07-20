import { Request, Response } from "express";
import { User } from "./user.model";
import httpsStatusCode from "http-status-codes";
import { UserSevices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response) => {
  const user = await UserSevices.createUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpsStatusCode.CREATED,
    message: "User created successfully",
    data: user,
  });
};
const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  sendResponse(res, {
    success: true,
    statusCode: httpsStatusCode.OK,
    message: "Users fetched successfully",
    data: users,
  });
};

export const UserController = {
  createUser,
  getAllUsers,
};
