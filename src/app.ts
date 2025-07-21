import express, { Request, Response } from "express";
import appRouter from "./app/routes";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import invalidRoute from "./app/middlewares/invalidRoute";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/", appRouter);

app.use("/test", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Tour Management System",
  });
});
app.use(globalErrorHandler);
app.use(invalidRoute);
export default app;
