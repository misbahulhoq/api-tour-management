import { Request, Response } from "express";
import { User } from "./user.model";
import httpsStatusCode from "http-status-codes";
import { UserSevices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import envVars from "../../config/envvars.config";
import { JwtPayload } from "jsonwebtoken";

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

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const token = req.headers.authorization;
  const verifiedToken = verifyToken(
    token as string,
    envVars.JWT_SECRET
  ) as JwtPayload;
  const payload = req.body;
  const user = await UserSevices.updateUser(userId, payload, verifiedToken);
  sendResponse(res, {
    success: true,
    statusCode: httpsStatusCode.OK,
    message: "User updated successfully",
    data: user,
  });
};

export const UserController = {
  createUser,
  getAllUsers,
  updateUser,
};
