import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import env from "../configurations/env";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const isDev = env.node_env === "development";

  const errorResponse = {
    success: false,
    message: "Something went wrong! 🐞 " + err.message,
    ...(isDev && { error: err }),
    ...(isDev && { stack: err.stack }),
  };

  res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
};

export default globalErrorHandler;
