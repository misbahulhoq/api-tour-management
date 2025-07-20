import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import AppError from "../../utils/AppError";
import { verifyToken } from "../../utils/jwt";
import envVars from "../../config/envvars.config";
const { createUser, getAllUsers } = UserController;
const router = express.Router();

router.post("/register", validateRequest(createUserZodSchema), createUser);
router.get(
  "/all",
  async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new AppError(401, "Unauthorized");
    }
    verifyToken(authToken, envVars.JWT_SECRET);
    next();
  },
  getAllUsers
);

export const UserRoutes = router;
