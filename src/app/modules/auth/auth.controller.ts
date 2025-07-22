import { Request, Response } from "express";
import AuthServices from "./auth.services";
import sendResponse from "../../utils/sendResponse";
export const login = async (req: Request, res: Response) => {
  const user = await AuthServices.login(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: user,
  });
};

export const AuthController = {
  login,
};
export default AuthController;
