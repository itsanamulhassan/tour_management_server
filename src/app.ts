import express, { Request, Response } from "express";
import appRouter from "./app/routes";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/", appRouter);

app.use("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Tour Management System",
  });
});

export default app;
