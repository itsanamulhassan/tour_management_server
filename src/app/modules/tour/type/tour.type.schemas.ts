import * as z from "zod";
const createTourType = z.object({
  name: z
    .string({ error: "Tour type must be a string." })
    .min(1, { error: "Type is required." }),
});

const updateTourType = z.clone(createTourType);

export const tourTypeSchemas = {
  createTourType,
  updateTourType,
};
