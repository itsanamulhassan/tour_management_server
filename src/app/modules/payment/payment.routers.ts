import { Router } from "express";
import schemaValidator from "../../middlewares/validateRequest";
import { paymentSchemas } from "./payment.schemas";
import { auth } from "../../utils/auth";
import { userRoleStatusEnum } from "../user/user.schemas";

const paymentRouter = Router();

paymentRouter.post(
  "/create",
  auth.authorizeRole(...userRoleStatusEnum),
  schemaValidator(paymentSchemas.createPayment)
);
paymentRouter.get("/all", auth.authorizeRole("ADMIN", "SUPERADMIN"));
paymentRouter.get("/:id", auth.authorizeRole(...userRoleStatusEnum));
paymentRouter.get("/my_bookings", auth.authorizeRole("ADMIN", "SUPERADMIN"));
