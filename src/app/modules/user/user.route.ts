import express from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interfaces";

const { createUser, getAllUsers } = UserController;
const router = express.Router();

router.post("/register", validateRequest(createUserZodSchema), createUser);
router.get("/all", checkAuth("ADMIN", Role.SUPERADMIN), getAllUsers);
router.patch(
  "/update/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserController.updateUser
);

export const UserRoutes = router;
