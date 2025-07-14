import express, { NextFunction, Request, Response } from "express";
const app = express();

app.use("/", (_req: Request, res: Response, _nxF: NextFunction) => {
  res.status(200).json({
    message: "Welcome to Tour Management System",
  });
});

export default app;
