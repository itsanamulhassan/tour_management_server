import * as z from "zod";
import { tourSchema } from "./tour.schemas";
import { Types } from "mongoose";

export type CreateTourDto = Omit<
  z.infer<typeof tourSchema.createTour>,
  "division" | "tourType"
> & { division: Types.ObjectId; tourType: Types.ObjectId };

export type UpdateTourDto = Omit<
  z.infer<typeof tourSchema.updateTour>,
  "division" | "tourType"
> & { division: Types.ObjectId; tourType: Types.ObjectId };
