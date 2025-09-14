import * as z from "zod";

const createTour = z.object({
  title: z
    .string({ error: "Title must be string." })
    .min(1, { error: "Title is required." }),
  slug: z
    .string({ error: "Slug must be string." })
    .min(1, { error: "Slug is required." })
    .lowercase()
    .optional(),
  description: z.string({ error: "Description must be string." }).optional(),
  thumbnails: z.array(z.string()).optional(),
  location: z.string({ error: "Location must be string." }).optional(),
  costFrom: z
    .number({ error: "Cost must be a number." })
    .positive({ error: "Cost must be a positive number." })
    .optional(),
  startDate: z
    .date({ error: "Starting date must be - DD/MM/YYYY." })
    .optional(),
  endDate: z.date({ error: "Ending date must be - DD/MM/YYYY." }).optional(),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  tourPlan: z.string().optional(),
  minAge: z
    .number({ error: "Minimum age is required." })
    .positive({ error: "Minimum age must be positive." })
    .optional(),
  division: z.string().min(1, { error: "Division is required." }).optional(),
  tourType: z.string().min(1, { error: "Type is required." }).optional(),
  maxGuest: z
    .number({ error: "Maximum guest must be a number." })
    .positive({ error: "Maximum guest must be a positive number." })
    .optional(),
});

const updateTour = z.clone(createTour).extend({
  selectedThumbnails: z.array(z.string()).optional(),
});

export const tourSchema = {
  createTour,
  updateTour,
};
