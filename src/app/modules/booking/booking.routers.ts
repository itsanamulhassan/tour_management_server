import { Router } from "express";
import { userRoleStatusEnum } from "../user/user.schemas";
import schemaValidator from "../../middlewares/validateRequest";
import { bookingSchemas } from "./booking.schemas";
import { bookingControllers } from "./booking.controllers";
import { auth } from "../auth/auth.helpers/auth";

const bookingRouter = Router();

bookingRouter.post(
  "/create",
  auth.authorizeRole(...userRoleStatusEnum),
  schemaValidator(bookingSchemas.createBooking),
  bookingControllers.createBooking
);

bookingRouter.get(
  "/all",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  bookingControllers.retrieveBookings
);

bookingRouter.get(
  "/me",
  auth.authorizeRole(...userRoleStatusEnum),
  bookingControllers.retrieveBookingMe
);

bookingRouter.get(
  "/:id",
  auth.authorizeRole(...userRoleStatusEnum),
  bookingControllers.retrieveBooking
);

bookingRouter.delete(
  "/delete/:id",
  auth.authorizeRole(...userRoleStatusEnum),
  bookingControllers.deleteBooking
);

bookingRouter.delete(
  "/update/:id",
  auth.authorizeRole(...userRoleStatusEnum),
  schemaValidator(bookingSchemas.updateBooking),
  bookingControllers.updateBooking
);

bookingRouter.patch(
  "/update/status/:id",
  auth.authorizeRole(...userRoleStatusEnum),
  schemaValidator(bookingSchemas.updateBookingStatus),
  bookingControllers.updateBookingStatus
);

export default bookingRouter;
