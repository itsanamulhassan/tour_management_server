import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import safeAsync from "../utils/safeAsync";

const schemaValidator = <T>(schema: ZodType<T>) =>
  safeAsync(async (req: Request, _res: Response, next: NextFunction) => {
    req.body = await schema.parseAsync(req.body);
    next();
  });

export default schemaValidator;
