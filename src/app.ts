import express, { NextFunction, Request, Response } from "express";
import appRouter from "./app/routes";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import env from "./app/configurations/env";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/", appRouter);

app.use("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Tour Management System",
  });
});
app.use(globalErrorHandler);
export default app;
