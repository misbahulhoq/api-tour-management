import express from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";

const { createUser, getAllUsers } = UserController;
const router = express.Router();

router.post("/register", validateRequest(createUserZodSchema), createUser);
router.get("/all", checkAuth("ADMIN"), getAllUsers);

export const UserRoutes = router;
