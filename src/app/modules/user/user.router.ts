import { Router } from "express";
import userControllers from "./user.controller";
import schemaValidator from "../../middlewares/validateRequest";
import { userSchemas } from "./user.schema";
import { auth } from "../../utils/auth";

const userRouter = Router();

// ✅ Create a new user
userRouter.post(
  "/register",
  schemaValidator(userSchemas.createUserSchema),
  userControllers.createUser
);
userRouter.get(
  "/all",
  auth.authorizeRole("ADMIN"),
  userControllers.retrieveUsers
);

export default userRouter;
