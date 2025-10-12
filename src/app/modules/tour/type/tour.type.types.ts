import * as z from "zod";
import { tourTypeSchemas } from "./tour.type.schemas";

export type CreateTourTypeProps = z.infer<
  typeof tourTypeSchemas.createTourType
>;
export type UpdateTourTypeProps = z.infer<
  typeof tourTypeSchemas.updateTourType
>;
