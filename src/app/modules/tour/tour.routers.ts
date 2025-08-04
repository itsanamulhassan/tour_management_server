import { Router } from "express";
import { auth } from "../../utils/auth";
import schemaValidator from "../../middlewares/validateRequest";
import { tourSchema } from "./tour.schemas";
import { tourControllers } from "./tour.controllers";

const tourRouter = Router();

tourRouter.post(
  "/create",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  schemaValidator(tourSchema.createTour),
  tourControllers.createTour
);
tourRouter.get(
  "/all",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  tourControllers.retrieveTours
);
tourRouter.patch(
  "/update/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  schemaValidator(tourSchema.updateTour),
  tourControllers.updateTour
);
tourRouter.get(
  "/single/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  tourControllers.retrieveTour
);
tourRouter.delete(
  "/delete/:id",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  tourControllers.deleteTour
);

export default tourRouter;
