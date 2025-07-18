import { Router } from "express";
import userRouter from "../modules/user/user.router";

// Initialize the main router
const appRouter = Router();

// Define all route modules here
const routes = [
  {
    path: "/users",
    router: userRouter,
  },
];

// Register all routes with the main appRouter
routes.forEach(({ path, router }) => {
  appRouter.use(path, router);
});

export default appRouter;
