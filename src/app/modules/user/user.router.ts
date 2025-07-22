import { Router } from "express";
import userControllers from "./user.controller";
import schemaValidator from "../../middlewares/validateRequest";
import { userSchemas } from "./user.schema";

const userRouter = Router();

// ✅ Create a new user
userRouter.post(
  "/register",
  schemaValidator(userSchemas.createUserSchema),
  userControllers.createUser
);

export default userRouter;
