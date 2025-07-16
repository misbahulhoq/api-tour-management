import express from "express";
import { UserController } from "./user.controller";

const { createUser, getAllUsers } = UserController;
const router = express.Router();

router.post("/register", createUser);
router.get("/", getAllUsers);

export const UserRoutes = router;
