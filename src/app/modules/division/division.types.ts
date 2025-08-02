import * as z from "zod";
import { divisionSchema } from "./division.schema";
export type CreateDivisionProps = z.infer<typeof divisionSchema.createDivision>;
export type UpdateDivisionProps = z.infer<typeof divisionSchema.updateDivision>;
