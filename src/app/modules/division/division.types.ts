import * as z from "zod";
import { divisionSchema } from "./division.schemas";
export type CreateDivisionProps = z.infer<typeof divisionSchema.createDivision>;
export type UpdateDivisionProps = z.infer<typeof divisionSchema.updateDivision>;
