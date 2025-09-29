import { Router } from "express";
import schemaValidator from "../../middlewares/schemaValidator";
import { userRoleStatusEnum, userSchemas } from "./user.schemas";
import { auth } from "../auth/auth.helpers/auth";
import { userControllers } from "./user.controllers";
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
userRouter.get(
  "/single/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  userControllers.retrieveUser
);
// ✅  User information by Access Token
userRouter.get(
  "/me",
  auth.authorizeRole(...userRoleStatusEnum),
  userControllers.retrieveMe
);
// ✅ Update user by ID
userRouter.patch(
  "/update/:id",
  schemaValidator(userSchemas.updateUser),
  auth.authorizeRole(...userRoleStatusEnum),
  userControllers.updateUser
);
// ✅ Delete user by ID
userRouter.delete(
  "/delete/:id",
  auth.authorizeRole(...userRoleStatusEnum),
  userControllers.updateUser
);

export default userRouter;
