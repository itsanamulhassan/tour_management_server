import { Router } from "express";
import schemaValidator from "../../middlewares/schemaValidator";
import { divisionSchema } from "./division.schemas";
import { divisionControllers } from "./division.controllers";
import { auth } from "../auth/auth.helpers/auth";
import { multerUpload } from "../../configurations/multer";

const divisionRouter = Router();

divisionRouter.post(
  "/",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  multerUpload("divisions").single("file"),
  schemaValidator(divisionSchema.createDivision),
  divisionControllers.createDivision
);
divisionRouter.get(
  "/",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  divisionControllers.retrieveDivisions
);
divisionRouter.patch(
  "/:divisionId",
  multerUpload("divisions").single("file"),
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  schemaValidator(divisionSchema.updateDivision),
  divisionControllers.updateDivision
);
divisionRouter.get(
  "/:divisionId",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  divisionControllers.retrieveDivision
);
divisionRouter.delete(
  "/:divisionId",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  divisionControllers.deleteDivision
);

export default divisionRouter;
