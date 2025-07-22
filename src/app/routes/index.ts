import { Router } from "express";
import userRouter from "../modules/user/user.router";
import authRouter from "../modules/auth/auth.router";

// Initialize the main router
const appRouter = Router();

// Define all route modules here
const routes = [
  {
    path: "/users",
    router: userRouter,
  },
  {
    path: "/auth",
    router: authRouter,
  },
];

// Register all routes with the main appRouter
routes.forEach(({ path, router }) => {
  appRouter.use(path, router);
});

export default appRouter;
