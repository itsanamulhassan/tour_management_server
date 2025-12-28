import { Router } from "express";
import schemaValidator from "../../../middlewares/schemaValidator";
import { tourTypeSchemas } from "./tour.type.schemas";
import { tourTypeControllers } from "./tour.type.controllers";
import { auth } from "../../auth/auth.helpers/auth";

const tourTypeRouter = Router();

tourTypeRouter.post(
  "",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  schemaValidator(tourTypeSchemas.createTourType),
  tourTypeControllers.createTourType
);
tourTypeRouter.get(
  "/",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  tourTypeControllers.retrieveTourTypes
);
tourTypeRouter.patch(
  "/:tourTypeId",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  schemaValidator(tourTypeSchemas.updateTourType),
  tourTypeControllers.updateTourType
);
tourTypeRouter.get(
  "/:tourTypeId",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  tourTypeControllers.retrieveTourType
);
tourTypeRouter.delete(
  "/:tourTypeId",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  tourTypeControllers.deleteTourType
);

export default tourTypeRouter;
