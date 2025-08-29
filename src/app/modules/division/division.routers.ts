import { Router } from "express";
import schemaValidator from "../../middlewares/validateRequest";
import { divisionSchema } from "./division.schemas";
import { divisionControllers } from "./division.controllers";
import { auth } from "../auth/auth.helpers/auth";

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
  "/update/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  schemaValidator(divisionSchema.updateDivision),
  divisionControllers.updateDivision
);
divisionRouter.get(
  "/single/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  divisionControllers.retrieveDivision
);
divisionRouter.delete(
  "/delete/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  divisionControllers.deleteDivision
);

export default divisionRouter;
