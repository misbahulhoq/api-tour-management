import { Request, Response } from "express";
import AuthServices from "./auth.services";
import sendResponse from "../../utils/sendResponse";
import { setAuthCookies } from "../../utils/setAuthCookie";
const login = async (req: Request, res: Response) => {
  const user = await AuthServices.credentialsLogin(req.body);
  setAuthCookies(res, user.tokenInfo);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: user,
  });
};

const getNewAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const accessToken = await AuthServices.getNewAccessToken(refreshToken);
  setAuthCookies(res, { accessToken });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "New auth token generated successfully",
    data: { accessToken },
  });
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.clearCookie("refreshToken");
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged out successfully",
  });
};

export const AuthController = {
  login,
  getNewAccessToken,
  logout,
};
export default AuthController;
