import express from "express";
import { UserController } from "./user.controller";

const { createUser, getUsers } = UserController;
const router = express.Router();

router.post("/register", createUser);
router.get("/", getUsers);

export const UserRoutes = router;
