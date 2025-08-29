import { Router } from "express";
import schemaValidator from "../../../middlewares/validateRequest";
import { tourTypeSchemas } from "./tour.type.schemas";
import { tourTypeControllers } from "./tour.type.controllers";
import { auth } from "../../auth/auth.helpers/auth";

const tourTypeRouter = Router();

tourTypeRouter.post(
  "/create",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  schemaValidator(tourTypeSchemas.createTourType),
  tourTypeControllers.createTourType
);
tourTypeRouter.get(
  "/all",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  tourTypeControllers.retrieveTourTypes
);
tourTypeRouter.patch(
  "/update/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  schemaValidator(tourTypeSchemas.updateTourType),
  tourTypeControllers.updateTourType
);
tourTypeRouter.get(
  "/single/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  tourTypeControllers.retrieveTourType
);
tourTypeRouter.delete(
  "/delete/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  tourTypeControllers.deleteTourType
);

export default tourTypeRouter;
