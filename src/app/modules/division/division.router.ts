import { Router } from "express";
import schemaValidator from "../../middlewares/validateRequest";
import { divisionSchema } from "./division.schema";
import { divisionControllers } from "./division.controller";
import { auth } from "../../utils/auth";

const divisionRouter = Router();

divisionRouter.post(
  "/create",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  schemaValidator(divisionSchema.createDivision),
  divisionControllers.createDivision
);
divisionRouter.get(
  "/all",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  divisionControllers.retrieveDivisions
);
divisionRouter.patch(
  "/update",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  schemaValidator(divisionSchema.updateDivision),
  divisionControllers.updateDivision
);
divisionRouter.get(
  "/single/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  divisionControllers.retrievedDivision
);
divisionRouter.delete(
  "/delete/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  divisionControllers.deleteDivision
);

export default divisionRouter;
