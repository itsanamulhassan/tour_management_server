import { Router } from "express";
import userControllers from "./user.controller";
import schemaValidator from "../../middlewares/validateRequest";
import { createUserSchema } from "./user.schema";

const userRouter = Router();

// ✅ Create a new user
userRouter.post(
  "/register",
  schemaValidator(createUserSchema),
  userControllers.createUser
);

export default userRouter;
