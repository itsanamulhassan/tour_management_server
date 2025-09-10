import * as z from "zod";
import { divisionSchema } from "./division.schemas";
export type CreateDivisionDto = z.infer<typeof divisionSchema.createDivision>;
export type UpdateDivisionDto = z.infer<typeof divisionSchema.updateDivision>;
