import { Router } from "express";
import schemaValidator from "../../middlewares/validateRequest";
import { guideSchema } from "./guide.schemas";
import { auth } from "../auth/auth.helpers/auth";
import { guideControllers } from "./guide.controllers";
import { userRoleStatusEnum } from "../user/user.schemas";
import { multerUpload } from "../../configurations/multer";

const guideRouter = Router();

guideRouter.post(
  "/create",
  multerUpload("guide_nid").single("file"),
  schemaValidator(guideSchema.createGuideSchema),
  auth.authorizeRole("USER"),
  guideControllers.createGuide
);
guideRouter.get(
  "/all",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  guideControllers.retrieveGuides
);
guideRouter.get(
  "/:id",
  auth.authorizeRole(...userRoleStatusEnum),
  guideControllers.retrieveGuide
);
guideRouter.delete(
  "/delete/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  guideControllers.deleteGuide
);
guideRouter.patch(
  "/update/:id",
  auth.authorizeRole(...userRoleStatusEnum),
  guideControllers.updateGuide
);
guideRouter.patch(
  "/update/status/:id",
  schemaValidator(guideSchema.updateGuideStatusSchema),
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  guideControllers.updateGuideStatus
);

export default guideRouter;
