import { ErrorRequestHandler } from "express";
import env from "../configurations/env";
import AppError from "../errorHelper/appError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let statusCode = 500;
  let message = "Something went wrong! 🐞 " + err.message;
  const isDev = env.node_env === "development";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  const errorResponse = {
    success: false,
    message,
    ...(isDev && { error: err }),
    ...(isDev && { stack: err.stack }),
  };

  res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
