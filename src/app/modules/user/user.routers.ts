import { Router } from "express";
import userControllers from "./user.controllers";
import schemaValidator from "../../middlewares/validateRequest";
import { userRoleStatusEnum, userSchemas } from "./user.schemas";
import { auth } from "../auth/auth.helpers/auth";
const userRouter = Router();

// ✅ Create a new user
userRouter.post(
  "/register",
  schemaValidator(userSchemas.createUser),
  userControllers.createUser
);
// ✅ Get all the users
userRouter.get(
  "/all",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  userControllers.retrieveUsers
);
// ✅ Update user by ID
userRouter.patch(
  "/update/:id",
  schemaValidator(userSchemas.updateUser),
  auth.authorizeRole(...userRoleStatusEnum),
  userControllers.updateUser
);

export default userRouter;
