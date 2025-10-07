import { Router } from "express";
import { statisticControllers } from "./statistic.controllers";
import { auth } from "../auth/auth.helpers/auth";

const statisticRouter = Router();

statisticRouter.get(
  "/user",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  statisticControllers.userStatistics
);
statisticRouter.get(
  "/tour",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  statisticControllers.tourStatistics
);
statisticRouter.get(
  "/booking",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  statisticControllers.bookingStatistics
);
statisticRouter.get(
  "/payment",
  auth.authorizeRole("ADMIN", "SUPERADMIN"),
  statisticControllers.paymentStatistics
);

export default statisticRouter;
