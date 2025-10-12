import express, { Request, Response } from "express";
import cors from "cors";
import appRouter from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import invalidRoute from "./app/middlewares/invalidRoute";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import env from "./app/configurations/env";
import "./app/configurations/passport";

const app = express();

app.use(
  expressSession({
    secret: env.express_session_secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// Parse incoming JSON requests
app.use(express.json());
app.set("trust proxy", 1);

// Enable CORS
app.use(
  cors({
    origin: [env.frontend_base_url],
    credentials: true,
  })
);

// Root route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Tour Management System",
  });
});

// API routes
app.use("/api/v1", appRouter);

// Invalid route handler (404)
app.use(invalidRoute);

// Global error handler (500, validation errors, etc.)
app.use(globalErrorHandler);

export default app;
