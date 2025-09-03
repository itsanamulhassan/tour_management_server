import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import safeAsync from "../utils/safeAsync";

const schemaValidator = <T>(schema: ZodType<T>) =>
  safeAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const payload = JSON.parse(req.body.data) || req.body;
    console.log(req.body);
    req.body = await schema.parseAsync(payload);
    next();
  });

export default schemaValidator;
