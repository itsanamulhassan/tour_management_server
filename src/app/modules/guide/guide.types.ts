import { guideSchema } from "./guide.schemas";
import z from "zod";

export type CreateGuideDto = z.infer<typeof guideSchema.createGuideSchema>;
export type UpdateGuideDto = z.infer<
  typeof guideSchema.updateGuideStatusSchema
>;
