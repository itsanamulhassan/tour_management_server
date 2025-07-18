import { Router } from "express";
import { createUser } from "./user.controller";

const userRouter = Router();

// ✅ Create a new user
userRouter.post("/register", createUser);

export default userRouter;
