import { Router } from "express";

const statisticRouter = Router();

statisticRouter.get("/user");
statisticRouter.get("/tour");
statisticRouter.get("/booking");
statisticRouter.get("/payment");

export default statisticRouter;
