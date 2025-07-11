import express from "express";
import { UserController } from "./user.controller";

const { createUser } = UserController;
const router = express.Router();

router.post("/register", createUser);

export const UserRoutes = router;
