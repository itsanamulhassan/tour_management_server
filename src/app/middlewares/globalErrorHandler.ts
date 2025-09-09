import { ErrorRequestHandler } from "express";
import env from "../configurations/env";
import AppError from "../utils/helpers/error/appError";
import { ErrorSourceProps } from "../types/middleware.types";
import { errorFormatter } from "../utils/errorFormatter";
import { deleteCloudinaryFile } from "../configurations/cloudinary";
const globalErrorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next
) => {
  const isDev = env.node_env === "development";

  let statusCode = 500;
  let message = "Something went wrong! 🐞";
  let errorSource: ErrorSourceProps[] = [];

  if (req.file || req.files?.length) {
    if (req.file) {
      await deleteCloudinaryFile(req.file);
    } else {
      await Promise.all(
        (req.files as Express.Multer.File[])?.map((file) =>
          deleteCloudinaryFile(file)
        )
      );
    }
  }

  if (error?.name === "ZodError") {
    ({ statusCode, message, errorSource } =
      errorFormatter.zodValidation(error));
  } else if (error?.cause?.code === 11000) {
    ({ statusCode, message } = errorFormatter.mongooseDuplicate(error));
  } else if (error?.name === "CastError") {
    ({ statusCode, message } = errorFormatter.mongooseCast());
  } else if (error?.name === "ValidationError") {
    ({ statusCode, message, errorSource } =
      errorFormatter.mongooseValidation(error));
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  const errorResponse = {
    success: false,
    message,
    ...(isDev && { error }),
    ...(errorSource.length && { errorSource }),
    ...(isDev && { stack: error.stack }),
  };

  res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
