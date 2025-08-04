import * as z from "zod";
import { tourSchema } from "./tour.schemas";
import { Types } from "mongoose";

export type CreateTourProps = Omit<
  z.infer<typeof tourSchema.createTour>,
  "division" | "tourType"
> & { division: Types.ObjectId; tourType: Types.ObjectId };
