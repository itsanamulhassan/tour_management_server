import { Router } from "express";
import { auth } from "../../utils/auth";
import { userRoleStatusEnum } from "../user/user.schemas";
import schemaValidator from "../../middlewares/validateRequest";
import { bookingSchemas } from "./booking.schemas";

const bookingRouter = Router();

bookingRouter.post(
  "/create",
  auth.authorizeRole(...userRoleStatusEnum),
  schemaValidator(bookingSchemas.createBooking)
);

bookingRouter.get("/all", auth.authorizeRole("ADMIN", "SUPERADMIN"));
bookingRouter.get("/me", auth.authorizeRole(...userRoleStatusEnum));
bookingRouter.get("/:id", auth.authorizeRole(...userRoleStatusEnum));
bookingRouter.patch("/status/:id", auth.authorizeRole(...userRoleStatusEnum));

export default bookingRouter;
