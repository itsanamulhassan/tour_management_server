import { NextFunction, Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";

const createDivision = safeAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
const updateDivision = safeAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
const deleteDivision = safeAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
const retrieveDivisions = safeAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
const retrievedDivision = safeAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
export const divisionControllers = {
  createDivision,
  updateDivision,
  deleteDivision,
  retrieveDivisions,
  retrievedDivision,
};
