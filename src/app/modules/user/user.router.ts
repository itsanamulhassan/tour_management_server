import { Router } from "express";
import userControllers from "./user.controller";
import schemaValidator from "../../middlewares/validateRequest";
import { userRoleStatusEnum, userSchemas } from "./user.schema";
import { auth } from "../../utils/auth";

const userRouter = Router();

// ✅ Create a new user
userRouter.post(
  "/register",
  schemaValidator(userSchemas.createUserSchema),
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
  schemaValidator(userSchemas.updateUserSchema),
  auth.authorizeRole(...userRoleStatusEnum),
  userControllers.updateUser
);

export default userRouter;
