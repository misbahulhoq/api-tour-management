import { Request, Response, NextFunction } from "express";
import AuthServices from "./auth.services";
import sendResponse from "../../utils/sendResponse";
import { setAuthCookies } from "../../utils/setAuthCookie";
import { createUserTokens } from "../../utils/userTokens";
import AppError from "../../utils/AppError";
import envVars from "../../config/envvars.config";
import passport from "passport";
const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    { failureRedirect: "/login" },
    async (err: any, user: any, info: any) => {
      if (err) {
        console.log("returning error", err);
        return next(new AppError(401, err));
      }
      if (!user) {
        return next(new AppError(401, "Invalid credentials"));
      }
      const tokenInfo = createUserTokens(user);
      setAuthCookies(res, tokenInfo);
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: { user, tokenInfo },
      });
    }
  )(req, res, next);
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

const loginWithGoogle = async (req: Request, res: Response) => {
  const user = req.user;
  let redirectTo = req.query.state as string;

  if (redirectTo.startsWith("/")) {
    redirectTo = redirectTo.slice(1);
  }
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const tokenInfo = createUserTokens(user);
  setAuthCookies(res, tokenInfo);
  res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
};

export const AuthController = {
  login,
  loginWithGoogle,
  getNewAccessToken,
  logout,
};
export default AuthController;
