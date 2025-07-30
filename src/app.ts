import express, { Request, Response } from "express";
import cors from "cors";
import appRouter from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import invalidRoute from "./app/middlewares/invalidRoute";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

// Parse incoming JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

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
