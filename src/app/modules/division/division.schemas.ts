import * as z from "zod";

const createDivision = z.object({
  name: z
    .string({ error: "Name must be a string" })
    .min(1, { error: "Division name is required." }),
  slug: z
    .string({ error: "Slug must be a string" })
    .min(1, { error: "Division slug is required." })
    .optional(),
  thumbnail: z.string({ error: "Thumbnail must be a string" }).optional(),
  description: z.string({ error: "Description must be a string" }).optional(),
});

const updateDivision = z.clone(createDivision);

export const divisionSchema = {
  createDivision,
  updateDivision,
};
