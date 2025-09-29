import { Router } from "express";

import { userRoleStatusEnum } from "../user/user.schemas";
import { auth } from "../auth/auth.helpers/auth";
import { paymentControllers } from "./payment.controllers";

const paymentRouter = Router();

paymentRouter.post("/success", paymentControllers.successPayment);
paymentRouter.post("/fail", paymentControllers.failPayment);
paymentRouter.post("/cancel", paymentControllers.cancelPayment);

paymentRouter.post("/update/:id", paymentControllers.updatePayment);

paymentRouter.get("/all", auth.authorizeRole("ADMIN", "SUPERADMIN"));
paymentRouter.get("/:id", auth.authorizeRole(...userRoleStatusEnum));
paymentRouter.get("/my_bookings", auth.authorizeRole("ADMIN", "SUPERADMIN"));
export default paymentRouter;
