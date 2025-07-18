import { Router } from "express";
import userControllers from "./user.controller";

const userRouter = Router();

// ✅ Create a new user
userRouter.post("/register", userControllers.createUser);

export default userRouter;
