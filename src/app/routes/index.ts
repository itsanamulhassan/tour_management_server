import { Router } from "express";
import userRouter from "../modules/user/user.routers";
import authRouter from "../modules/auth/auth.routers";
import divisionRouter from "../modules/division/division.routers";
import tourTypeRouter from "../modules/tour/type/tour.type.routers";
import tourRouter from "../modules/tour/tour.routers";

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
  {
    path: "/divisions",
    router: divisionRouter,
  },
  {
    path: "/tour_types",
    router: tourTypeRouter,
  },
  {
    path: "/tours",
    router: tourRouter,
  },
  {
    path: "/payments",
    router: tourRouter,
  },
  {
    path: "/bookings",
    router: ,
  },
];

// Register all routes with the main appRouter
routes.forEach(({ path, router }) => {
  appRouter.use(path, router);
});

export default appRouter;
